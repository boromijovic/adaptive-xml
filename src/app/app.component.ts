import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import * as ACData from 'adaptivecards-templating';
import * as AdaptiveCards from '@asseco/adaptivecards';
import snarkdown from 'snarkdown';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import * as Xsd from 'monaco-xsd-code-completion/umd/main.js';
import * as Xml2Js from 'xml2js';
import { AdaptiveProvider } from './adaptive.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('jssdk', { static: true }) jssdk: ElementRef | undefined;

  @ViewChild('editor')
  public editorContent!: ElementRef;
  
  @ViewChild('editorData')
  public editorData!: ElementRef;

  public cardDefinition = '';

  public skippableProperties = ['type', 'body', 'items', 'facts', 'columns', 'actions', 'card'];
  public bodyProperties = ['Card'];
  public itemsProperties = ['Column', 'Container'];
  public columnsProperties = ['ColumnSet'];
  public factsProperties = ['FactSet'];
  public xml: any;

  cardData = {
    title: 'Publish Adaptive Card Schema',
    description: 'Now that we have defined the main rules and features of the format, we need to produce a schema and publish it to GitHub. The schema will be the starting point of our reference documentation.',
    creator: {
      name: 'Matt Hidinger',
      profileImage: 'https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg'
    },
    createdUtc: '2017-02-14T06:08:39Z',
    viewUrl: 'https://adaptivecards.io',
    properties: [
      {
        key: 'Board',
        value: 'Adaptive Cards'
      },
      {
        key: 'List',
        value: 'Backlog'
      },
      {
        key: 'Assigned to',
        value: 'Matt Hidinger'
      },
      {
        key: 'Due date',
        value: 'Not set'
      }
    ]
  };

  constructor( private cdr: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    const onGotAmdLoader = () => {
      // Load monaco
      (window as any).require(['vs/editor/editor.main'], () => {
        this.initMonaco();
      });
    };

    // Load AMD loader if necessary
    if (!(window as any).require) {
      const loaderScript = document.createElement('script');
      loaderScript.type = 'text/javascript';
      loaderScript.src = 'vs/loader.js';
      loaderScript.addEventListener('load', onGotAmdLoader);
      document.body.appendChild(loaderScript);
    } else {
      onGotAmdLoader();
    }
  }

  // Will be called once monaco library is available
  private initMonaco() {
    const xmlDiv: HTMLDivElement = this.editorContent.nativeElement;
    const dataDiv: HTMLDivElement = this.editorData.nativeElement;
    monaco.editor.setTheme('vs-dark');
    const editor = monaco.editor.create(xmlDiv, {
      model: monaco.editor.createModel('', 'xml'),
      minimap: {
        enabled: false
      },
      automaticLayout: true,
      lineNumbers: 'on',
      lineNumbersMinChars: 1,
      scrollBeyondLastLine: false,
      fontSize: 18,
      tabSize: 2,
    });
    const dataEditor = monaco.editor.create(dataDiv, {
      model: monaco.editor.createModel(JSON.stringify(this.cardData, null, '\t'), 'json'),
      minimap: {
        enabled: false
      },
      automaticLayout: true,
      lineNumbers: 'on',
      lineNumbersMinChars: 1,
      scrollBeyondLastLine: false,
      fontSize: 18,
      tabSize: 2,
    }, {
      theme: 'vs-light'
    });
    const xsdManager = new Xsd.XsdManager(editor); // Initialise the xsdManager
    xsdManager.set({
      path: 'ibisdoc.xsd', // Path that will be referenced in the xml.
      value: null, // String containing XSD.
      namespace: 'xs', // The namespace used inside the XSD (xsd or xs). *optional
      alwaysInclude: true, //
      includeIfRootTag: [], // Include XSD based on the root tag of the file. *optional
    });
    const xsdFeatures = new Xsd.XsdFeatures(xsdManager, monaco, editor); // Initialise the xsdFeatures.
    monaco.languages.registerDocumentFormattingEditProvider('xml', {
      async provideDocumentFormattingEdits(model, options, token) {
        return [
          {
            range: model.getFullModelRange(),
            text: AdaptiveProvider.formatXml(model.getValue()),
          },
        ];
      },
    });
    // xsdFeatures.addCompletion(); // Add auto completion.
    monaco.languages.registerCompletionItemProvider('xml', new AdaptiveProvider().getCompletionProvider(monaco));
    xsdFeatures.addValidation(); // Add auto validation on debounce. Can be manually triggered with doValidation.
    xsdFeatures.addGenerateAction(); // Add geneate template to actions menu. Generate can be run with doGenerate.
    xsdFeatures.addReformatAction(); // Add reformat code to actions menu. Can be run manually with doReformatCode.
    editor.getModel().onDidChangeContent((event) => {
      if (this.jssdk.nativeElement.firstChild) {
        this.jssdk.nativeElement.removeChild(this.jssdk.nativeElement.firstChild);
      }
      const monacoValue = editor.getModel().getValue();
      Xml2Js.parseString(monacoValue, (err: any, result: any) => {
        this.cardDefinition = this.reconfigureJsonToNormal(result);

        this.updateCard(this.cardDefinition);
      });

      AdaptiveProvider.card = monacoValue;
    });

    dataEditor.getModel().onDidChangeContent((event) => {
      if (this.jssdk.nativeElement.firstChild) {
        this.jssdk.nativeElement.removeChild(this.jssdk.nativeElement.firstChild);
      }

      this.cardData = JSON.parse(dataEditor.getModel().getValue());

      this.updateCard(this.cardDefinition);

      AdaptiveProvider.card = dataEditor.getModel().getValue();
    });
  }

  updateCard(definition) {
    const template = new ACData.Template(definition);
        const context: ACData.IEvaluationContext = {
          $root: this.cardData,
        };
        const card = template.expand(context);
        const adaptiveCard = new AdaptiveCards.AdaptiveCard();
        AdaptiveCards.AdaptiveCard.onProcessMarkdown = (text, res) => {
          res.outputHtml = snarkdown(text);
          res.didProcess = true;
        };

        adaptiveCard.parse(card);
        const renderedCard = adaptiveCard.render();
        this.jssdk.nativeElement.appendChild(renderedCard);
        this.cdr.detectChanges();
  }

  cleanXML(xml: any) {
    xml = xml.replaceAll('<Body>', '');
    xml = xml.replaceAll('</Body>', '');

    xml = xml.replaceAll('<Items>', '');
    xml = xml.replaceAll('</Items>', '');

    xml = xml.replaceAll('<Columns>', '');
    xml = xml.replaceAll('</Columns>', '');

    xml = xml.replaceAll('<Facts>', '');
    xml = xml.replaceAll('</Facts>', '');

    xml = xml.replaceAll(`<?xml version='1.0'?>`,'');
    xml = xml.replaceAll('<adaptiveCard>','');
    xml = xml.replaceAll('</adaptiveCard>','');

    return xml;
  }

  reconfigureJsonForXML(json: any, extraProperty?: any) {
    json = this.checkForRecursion(json);

    if (json.type) {
      json.type === 'AdaptiveCard' ? json.type = 'Card' : '';
      json[json.type] = this.addChildToObject(json);
      json[json.type]['@'] = this.addKeysToObject(json, json.type);
      this.clearObject(json, json.type);
    }

    if (json?.length > 0) {
      for (let obj of json) {
        obj = this.checkForRecursion(obj);
        if (obj.type) {
          obj[obj.type] = this.addChildToObject(obj);
          obj[obj.type]['@'] = this.addKeysToObject(obj, obj.type);
          this.clearObject(obj, obj.type);
        }
        else {
          if (extraProperty) {
            obj[extraProperty] = this.addChildToObject(obj);
            obj[extraProperty]['@'] = this.addKeysToObject(obj, extraProperty);
            this.clearObject(obj, extraProperty);
          }
        }
      }
    }
    return json;
  }

  clearObject(obj: any, mainKeyName?: string) {
    for (const variableKey in obj) {
      if (obj.hasOwnProperty(variableKey) && mainKeyName !== variableKey) {
        delete obj[variableKey];
      }
    }
  }

  addKeysToObject(obj: any, mainKeyName: string) {
    const newObj: any = {};
    for (let variableKey in obj) {
      if (obj.hasOwnProperty(variableKey) && mainKeyName !== variableKey) {
        if (!this.skippableProperties.includes(variableKey)) {
          const originalVariableKey = variableKey;
          variableKey === '$schema' ? variableKey = 'schema' : variableKey;
          const upperVariableKey = variableKey.charAt(0).toUpperCase() + variableKey.slice(1);
          newObj[upperVariableKey] = obj[originalVariableKey];
        }
      }
    }
    return newObj;
  }

  addChildToObject(obj: any) {
    const newObj: any = {};
    if (obj.body) {
      newObj.Body = obj.body;
    }
    if (obj.items) {
      newObj.Items = obj.items;
    }
    if (obj.facts) {
      newObj.Facts = obj.facts;
    }
    if (obj.columns) {
      newObj.Columns = obj.columns;
    }
    if (obj.actions) {
      newObj.Actions = obj.actions;
    }
    if (obj.card) {
      newObj.Card = obj.card;
    }
    return newObj;
  }

  checkForRecursion(obj: any) {
    if (obj?.body) {
      obj.body = this.reconfigureJsonForXML(obj.body);
    }
    if (obj?.items) {
      obj.items = this.reconfigureJsonForXML(obj.items);
    }
    if (obj?.facts) {
      obj.facts = this.reconfigureJsonForXML(obj.facts, 'Fact');
    }
    if (obj?.columns) {
      obj.columns = this.reconfigureJsonForXML(obj.columns);
    }
    if (obj?.actions) {
      obj.actions = this.reconfigureJsonForXML(obj.actions);
    }
    if (obj?.card) {
      obj.card = this.reconfigureJsonForXML(obj.card);
    }

    return obj;
  }

  reconfigureJsonToNormal(json: any) {
    let newJson: any = {};
    if (Object.keys(json)) {
      const arrayOfAllObjects = [];
      for (var property in json) {
        // If the Json property is an array
        if (Array.isArray(json[property])) {
          // Takes each object from the array
          for (const arrayObj of json[property]) {
            let newArrayObj: any = {};
            newArrayObj = this.goThroughObjectProperties(arrayObj, property);
            arrayOfAllObjects.push(newArrayObj);
          }
          newJson = arrayOfAllObjects;
        }
        // If its not an array (in the cases tested it doesn't happen)
        else {
          newJson = this.goThroughObjectProperties(json[property], property);
        }
      }
    }
    return newJson;
  }

  addPropertiesToObject(obj: any) {
    const newObj: any = {};

    for (const variableKey in obj) {
      let lowerVariableKey = variableKey.charAt(0).toLowerCase() + variableKey.slice(1);
      lowerVariableKey === 'schema' ? lowerVariableKey = '$schema' : lowerVariableKey;
      if (obj[variableKey] === 'true') {
        newObj[lowerVariableKey] = true;
      }
      else if (obj[variableKey] === 'false') {
        newObj[lowerVariableKey] = false;
      }
      else {
        newObj[lowerVariableKey] = obj[variableKey];
      }
    }
    return newObj;
  }

  goThroughObjectProperties(obj: any, mainProperty: any) {
    let newObj: any = {};
    for (const propertyOfarrayObj in obj) {
      // Levels attributes to root level
      if (propertyOfarrayObj === '$') {
        newObj = this.addPropertiesToObject(obj[propertyOfarrayObj]);
      }
      // Puts every other property in container (ex. body/items)
      else {
        if (this.bodyProperties.includes(mainProperty)) {
          newObj.body = newObj.body ?? {};
          newObj.body[propertyOfarrayObj] = obj[propertyOfarrayObj];
        }
        else if (this.itemsProperties.includes(mainProperty)) {
          newObj.items = newObj.items ?? {};
          newObj.items[propertyOfarrayObj] = obj[propertyOfarrayObj];
        }
        else if (this.factsProperties.includes(mainProperty)) {
          newObj.facts = newObj.facts ?? {};
          newObj.facts[propertyOfarrayObj] = obj[propertyOfarrayObj];
        }
        else if (this.columnsProperties.includes(mainProperty)) {
          newObj.columns = newObj.columns ?? {};
          newObj.columns[propertyOfarrayObj] = obj[propertyOfarrayObj];
        }
      }
      // TODO actions
    }
    if (mainProperty === 'Card') {
      newObj.type = 'AdaptiveCard';
    }
    else if (mainProperty === 'Fact') { }
    else {
      newObj.type = mainProperty;
    }
    if (newObj.body) {
      newObj.body = this.reconfigureJsonToNormal(newObj.body);
    }
    else if (newObj.items) {
      newObj.items = this.reconfigureJsonToNormal(newObj.items);
    }
    else if (newObj.facts) {
      newObj.facts = this.reconfigureJsonToNormal(newObj.facts);
    }
    else if (newObj.columns) {
      newObj.columns = this.reconfigureJsonToNormal(newObj.columns);
    }
    return newObj;
  }
}
