/* eslint-disable max-len */
/* eslint-disable radix */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/prefer-for-of */
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
export class AdaptiveProvider {
  public static card = '';
  public static schemaNode() {
    const adaptiveSchema = `<xs:schema elementFormDefault="qualified" xmlns:xs="http://www.w3.org/2001/XMLSchema">
    <xs:element name="Card" type="AdaptiveCard" />
    <xs:element name="TextBlock" type="TextBlock" />
    <xs:element name="Image" type="Image" />
    <xs:element name="Container" type="Container" />
    <xs:element name="ColumnSet" type="ColumnSet" />
    <xs:element name="Column" type="Column" />
    <xs:element name="FactSet" type="FactSet" />
    <xs:element name="Fact" type="Fact" />
    <xs:element name="Input.Text" type="Input.Text" />
    <xs:complexType name="AdaptiveTypedElement" abstract="true">
      <xs:attribute name="Id" type="xs:string" />
    </xs:complexType>
    <xs:complexType name="AdaptiveElement" abstract="true">
      <xs:complexContent mixed="false">
        <xs:extension base="AdaptiveTypedElement">
          <xs:attribute default="Default" name="Spacing" type="AdaptiveSpacing" />
          <xs:attribute default="false" name="Separator" type="xs:boolean" />
        </xs:extension>
      </xs:complexContent>
    </xs:complexType>
    <xs:complexType name="AdaptiveInput" abstract="true">
      <xs:complexContent mixed="false">
        <xs:extension base="AdaptiveElement" />
      </xs:complexContent>
    </xs:complexType>
    <xs:complexType name="AdaptiveCard">
      <xs:complexContent mixed="false">
        <xs:extension base="AdaptiveTypedElement">
          <xs:sequence>
            <xs:element minOccurs="0" maxOccurs="1" name="TextBlock" type="TextBlock" />
            <xs:element minOccurs="0" maxOccurs="1" name="Image" type="Image" />
            <xs:element minOccurs="0" maxOccurs="1" name="Container" type="Container" />
            <xs:element minOccurs="0" maxOccurs="1" name="ColumnSet" type="ColumnSet" />
            <xs:element minOccurs="0" maxOccurs="1" name="FactSet" type="FactSet" />
            <xs:element minOccurs="0" maxOccurs="1" name="Input.Text" type="Input.Text" />
          </xs:sequence>
          <xs:attribute name="BackgroundImage" type="xs:string" use="optional" />
          <xs:attribute name="FallbackText" type="xs:string" use="optional" />
          <xs:attribute name="Version" type="xs:string" use="optional" />
        </xs:extension>
      </xs:complexContent>
    </xs:complexType>
    <xs:complexType name="TextBlock" mixed="true">
      <xs:complexContent mixed="false">
        <xs:extension base="AdaptiveElement">
          <xs:attribute default="false" name="IsSubtle" type="xs:boolean" use="optional" />
          <xs:attribute default="false" name="Wrap" type="xs:boolean" use="optional" />
          <xs:attribute default="0" name="MaxLines" type="xs:int" />
          <xs:attribute name="Text" type="xs:string" />
          <xs:attribute name="Color" type="xs:string" use="optional" />
          <xs:attribute name="FontType" type="xs:string" use="optional" />
          <xs:attribute name="HorizontalAlignment	" type="xs:string" use="optional" />
          <xs:attribute name="Size" type="AdaptiveSize" use="optional" />
          <xs:attribute name="Weight" type="AdaptiveWeight" use="optional" />
        </xs:extension>
      </xs:complexContent>
    </xs:complexType>
    <xs:complexType name="Image">
      <xs:complexContent mixed="false">
        <xs:extension base="AdaptiveElement">
          <xs:attribute name="Url" type="xs:string" />
          <xs:attribute name="AltText" type="xs:string" use="optional" />
          <xs:attribute name="BackgroundColor" type="xs:string" use="optional" />
          <xs:attribute name="Height" type="xs:string" use="optional" />
          <xs:attribute name="HorizontalAlignment" type="xs:string" use="optional" />
          <xs:attribute name="Style" type="AdaptiveImageStyle" use="optional" />
          <xs:attribute name="Size" type="AdaptiveSize" use="optional" />
          <xs:attribute name="Width" type="AdaptiveWidth" use="optional" />
        </xs:extension>
      </xs:complexContent>
    </xs:complexType>
    <xs:complexType name="Container">
      <xs:complexContent mixed="false">
        <xs:extension base="AdaptiveElement">
          <xs:sequence>
            <xs:element minOccurs="0" maxOccurs="1" name="TextBlock" type="TextBlock" />
            <xs:element minOccurs="0" maxOccurs="1" name="Image" type="Image" />
            <xs:element minOccurs="0" maxOccurs="1" name="Container" type="Container" />
            <xs:element minOccurs="0" maxOccurs="1" name="ColumnSet" type="ColumnSet" />
            <xs:element minOccurs="0" maxOccurs="1" name="FactSet" type="FactSet" />
            <xs:element minOccurs="0" maxOccurs="1" name="Input.Text" type="Input.Text" />
          </xs:sequence>
          <xs:attribute name="VerticalContentAlignment" type="xs:string" use="optional" />
          <xs:attribute name="Bleed" type="xs:string" use="optional" />
          <xs:attribute name="BackgroundImage" type="xs:string" use="optional" />
          <xs:attribute name="MinHeight" type="xs:string" use="optional" />
        </xs:extension>
      </xs:complexContent>
    </xs:complexType>
    <xs:complexType name="ColumnSet">
      <xs:complexContent mixed="false">
        <xs:extension base="AdaptiveElement">
          <xs:sequence>
            <xs:element minOccurs="0" maxOccurs="unbounded" name="Column" type="Column" />
          </xs:sequence>
          <xs:attribute name="HorizontalAlignment" type="xs:string" use="optional" />
          <xs:attribute name="Bleed" type="xs:string" use="optional" />
          <xs:attribute name="MinHeight" type="xs:string" use="optional" />
        </xs:extension>
      </xs:complexContent>
    </xs:complexType>
    <xs:complexType name="Input.Text">
      <xs:complexContent mixed="false">
        <xs:extension base="AdaptiveInput">
          <xs:attribute name="Placeholder" type="xs:string" />
          <xs:attribute name="Value" type="xs:string" />
          <xs:attribute default="false" name="IsMultiline" type="xs:boolean" />
          <xs:attribute default="0" name="MaxLength" type="xs:int" />
        </xs:extension>
      </xs:complexContent>
    </xs:complexType>
    <xs:complexType name="FactSet">
      <xs:complexContent mixed="false">
        <xs:extension base="AdaptiveElement">
          <xs:sequence>
            <xs:element minOccurs="0" maxOccurs="unbounded" name="Fact" type="Fact" />
          </xs:sequence>
        </xs:extension>
      </xs:complexContent>
    </xs:complexType>
    <xs:complexType name="Fact">
      <xs:complexContent mixed="false">
        <xs:extension base="AdaptiveElement">
          <xs:attribute name="Title" type="xs:string" />
          <xs:attribute name="Value" type="xs:string" />
        </xs:extension>
      </xs:complexContent>
    </xs:complexType>
    <xs:complexType name="Column">
      <xs:complexContent mixed="false">
        <xs:extension base="Container">
          <xs:attribute name="Fallback" type="xs:string" use="optional" />
        </xs:extension>
      </xs:complexContent>
    </xs:complexType>
    <xs:simpleType name="AdaptiveSpacing">
      <xs:restriction base="xs:string">
        <xs:enumeration value="Default" />
        <xs:enumeration value="None" />
        <xs:enumeration value="Small" />
        <xs:enumeration value="Medium" />
        <xs:enumeration value="Large" />
        <xs:enumeration value="ExtraLarge" />
        <xs:enumeration value="Padding" />
      </xs:restriction>
    </xs:simpleType>
    <xs:simpleType name="AdaptiveWidth">
      <xs:restriction base="xs:string">
        <xs:enumeration value="auto" />
        <xs:enumeration value="stretch" />
        <xs:enumeration value="1" />
        <xs:enumeration value="2" />
        <xs:enumeration value="50px" />
        <xs:enumeration value="100px" />
      </xs:restriction>
    </xs:simpleType>
    <xs:simpleType name="AdaptiveWeight">
      <xs:restriction base="xs:string">
        <xs:enumeration value="Lighter" />
        <xs:enumeration value="Default" />
        <xs:enumeration value="Bolder" />
      </xs:restriction>
    </xs:simpleType>
    <xs:simpleType name="AdaptiveImageStyle">
      <xs:restriction base="xs:string">
        <xs:enumeration value="Default" />
        <xs:enumeration value="Person" />
      </xs:restriction>
    </xs:simpleType>
    <xs:simpleType name="AdaptiveSize">
      <xs:restriction base="xs:string">
        <xs:enumeration value="Auto" />
        <xs:enumeration value="Stretch" />
        <xs:enumeration value="Small" />
        <xs:enumeration value="Medium" />
        <xs:enumeration value="Large" />
      </xs:restriction>
    </xs:simpleType>
    <xs:simpleType name="AdaptiveHorizontalAlignment">
      <xs:restriction base="xs:string">
        <xs:enumeration value="Left" />
        <xs:enumeration value="Center" />
        <xs:enumeration value="Right" />
      </xs:restriction>
    </xs:simpleType>
  </xs:schema>`.replace(/xs\:/g, ''); // remove 'xs:' prefix for easier navigation later

    return AdaptiveProvider.stringToXml(adaptiveSchema).childNodes[0];
  }

  public getCompletionProvider(): any {
    return {
      triggerCharacters: ['<'],
      provideCompletionItems:
        (model: monaco.editor.ITextModel, position: monaco.Position, context: any, token: monaco.CancellationToken) => {
          // get editor content before the pointer
          const textUntilPosition = model.getValueInRange(
            { startLineNumber: 1, startColumn: 1, endLineNumber: position.lineNumber, endColumn: position.column });
          // get content info - are we inside of the area where we don't want suggestions, what is the content without those areas
          const areaUntilPositionInfo = AdaptiveProvider.getAreaInfo(textUntilPosition); // isCompletionAvailable, clearedText
          // if we don't want any suggestions, return empty array
          if (!areaUntilPositionInfo.isCompletionAvailable) {
            return {
              suggestions: []
            };
          }
          let wrappedTag = false;
          if (context.triggerCharacter && context.triggerCharacter === '<') {
            wrappedTag = true;
          }
          // if we want suggestions, inside of which tag are we?
          const lastOpenedTag = AdaptiveProvider.getLastOpenedTag(areaUntilPositionInfo.clearedText);

          // get opened tags to see what tag we should look for in the XSD schema
          const openedTags = [];
          // get the elements/attributes that are already mentioned in the element we're in
          const usedItems = [];
          const isAttributeSearch = lastOpenedTag && lastOpenedTag.isAttributeSearch;
          let lastChild = null;
          // no need to calculate the position in the XSD schema if we are in the root element
          if (lastOpenedTag) {
            // parse the content (not cleared text) into an xml document
            const xmlDoc = AdaptiveProvider.stringToXml(textUntilPosition + (areaUntilPositionInfo.previousChar === '"' ? '" ' : ''));
            lastChild = xmlDoc.lastElementChild;
            while (lastChild) {
              openedTags.push(lastChild.tagName);
              // if we found our last opened tag
              if (lastChild.tagName === lastOpenedTag.tagName) {
                // if we are looking for attributes, then used items should
                // be the attributes we already used
                if (lastOpenedTag.isAttributeSearch) {
                  const attrs = lastChild.attributes;
                  for (var i = 0; i < attrs.length; i++) {
                    usedItems.push(attrs[i].nodeName);
                  }
                }
                else {
                  // if we are looking for child elements, then used items
                  // should be the elements that were already used
                  const children = lastChild.children;
                  for (var i = 0; i < children.length; i++) {
                    usedItems.push(children[i].tagName);
                  }
                }
                break;
              }
              // we haven't found the last opened tag yet, so we move to
              // the next element
              lastChild = lastChild.lastElementChild;
            }
          }
          //  find the last opened tag in the schema to see what elements/attributes it can have
          let currentItem = AdaptiveProvider.schemaNode();
          const allItemsSchema = currentItem;
          if (openedTags.length > 0) {
            for (var i = 0; i < openedTags.length; i++) {
              if (currentItem) {
                currentItem = AdaptiveProvider.findElement(allItemsSchema, openedTags[i]);
              }
            }
            let result = [];
            // return available elements/attributes if the tag exists in the schema, or an empty
            // array if it doesn't
            if (isAttributeSearch) {
              // get attributes completions
              if (areaUntilPositionInfo.previousChar === '"') {
                const lastUsedAttribute = usedItems[usedItems.length - 1];
                result = currentItem ? AdaptiveProvider.getElementAttributeAvailableValues(allItemsSchema, currentItem, lastUsedAttribute) : [];
              } else {
                result = currentItem ? AdaptiveProvider.getElementAvailableAttributes(allItemsSchema, currentItem, usedItems) : [];
              }
            }
            else {
              // get elements completions
              result = currentItem ? AdaptiveProvider.getElementChildren(allItemsSchema, currentItem, usedItems, wrappedTag) : [];
            }
            return {
              suggestions: result
            };
          } else {
            return {
              suggestions: [{
                label: 'Card',
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: 'Adaptive card root element',
                insertText: (wrappedTag ? '' : '<') + 'Card Version="1.4" Id="adaptiveCard">\n</Card' + (wrappedTag ? '' : '>'),
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
              },
              {
                label: 'Sample Adaptive Card',
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: 'Sample Adaptive card with few elements',
                insertText: (wrappedTag ? '' : '<') + `Card Version="1.4" Id="adaptiveCard">
	<Container Id="container1">
		<ColumnSet Id="columnSet1">
			<Column Id="column1" Width="auto">
				<Image Id="image1" Url="https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg" AltText="Matt Hidinger" Size="Small" />
				<TextBlock Id="text1" />
			</Column>
		</ColumnSet>
	</Container>
</Card` + (wrappedTag ? '' : '>'),
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
              }]
            };
          }
        },
      resolveCompletionItem: (item) => {
        const promise = new Promise((resolve) => {
          setTimeout(() => {
            resolve(item);
          }, 500);
        });

        return promise;
      }
    };
  }
  public static getElementAttributeAvailableValues(schemaElements: any, element: any, attributeName: string): any[] {
    const availableItems = [];
    const complexType = AdaptiveProvider.findComplexType(schemaElements, element.getAttribute('type'));
    const complexTypeAttributes = AdaptiveProvider.findComplexTypeAttributes(complexType);
    for (var i = 0; i < complexTypeAttributes.length; i++) {
      // get all attributes for the element
      const attr: any = complexTypeAttributes[i];
      const attrName = attr.getAttribute('name');
      if (attrName === attributeName) {
        const attrType = attr.getAttribute('type');
        if (attrType.indexOf('xs:') === -1) {
          // attribute is not simple xs:type
          const simpleType = AdaptiveProvider.findSimpleType(schemaElements, attrType);
          if (simpleType) {
            availableItems.push(...AdaptiveProvider.resolveSimpleType(simpleType));
          }
        }
      }
    }
    return availableItems;
  }
  public static stringToXml(text) {
    let xmlDoc;
    if (window.DOMParser) {
      const parser = new DOMParser();
      xmlDoc = parser.parseFromString(text, 'text/xml');
    }
    return xmlDoc;
  }
  public static getLastOpenedTag(text) {
    // get all tags inside of the content
    const tags = text.match(/<\/*(?=\S*)([a-zA-Z-]+)/g);
    if (!tags) {
      return undefined;
    }
    // we need to know which tags are closed
    const closingTags = [];
    for (let i = tags.length - 1; i >= 0; i--) {
      if (tags[i].indexOf('</') === 0) {
        closingTags.push(tags[i].substring('</'.length));
      }
      else {
        // get the last position of the tag
        const tagPosition = text.lastIndexOf(tags[i]);
        const tag = tags[i].substring('<'.length);
        const closingBracketIdx = text.indexOf('/>', tagPosition);
        // if the tag wasn't closed
        if (closingBracketIdx === -1) {
          // if there are no closing tags or the current tag wasn't closed
          if (!closingTags.length || closingTags[closingTags.length - 1] !== tag) {
            // we found our tag, but let's get the information if we are looking for
            // a child element or an attribute
            text = text.substring(tagPosition);
            return {
              tagName: tag,
              isAttributeSearch: text.indexOf('<') > text.indexOf('>')
            };
          }
          // remove the last closed tag
          closingTags.splice(closingTags.length - 1, 1);
        }
        // remove the last checked tag and continue processing the rest of the content
        text = text.substring(0, tagPosition);
      }
    }
    return text;
  }
  public static getAreaInfo(text) {
    // opening for strings, comments and CDATA
    const items = ['"', '\'', '<!--', '<![CDATA['];
    let isCompletionAvailable = true;
    let previousChar = '';
    previousChar = text[text.length - 1];
    // remove all comments, strings and CDATA
    text = text.replace(/"([^"\\]*(\\.[^"\\]*)*)"|\'([^\'\\]*(\\.[^\'\\]*)*)\'|<!--([\s\S])*?-->|<!\[CDATA\[(.*?)\]\]>/g, '');
    for (let i = 0; i < items.length; i++) {
      const itemIdx = text.indexOf(items[i]);
      if (itemIdx > -1) {
        // we are inside one of unavailable areas, so we remote that area
        // from our clear text
        text = text.substring(0, itemIdx);
        // and the completion is not available
        // isCompletionAvailable = false;
      }
    }
    return {
      isCompletionAvailable,
      clearedText: text,
      previousChar
    };
  }
  public static findElement(schemaElements, elementName) {
    let res = null;
    for (let index = 0; index < schemaElements.children.length; index++) {
      const childElement = schemaElements.children[index];
      if (childElement.tagName === 'element' && childElement.getAttribute('name') === elementName) {
        res = childElement;
        return childElement;
      }
    }
    return res;
  }
  public static getElementChildren(schemaElements, element: any, type, wrappedTag) {
    const availableItems = [];
    const complexType = AdaptiveProvider.findComplexType(schemaElements, element.getAttribute('type'));
    const childrenElements = AdaptiveProvider.findComplexTypeChildren(complexType);
    for (var i = 0; i < childrenElements.length; i++) {
      // get all attributes for the element
      const elem: any = childrenElements[i];
      const elemName = elem.getAttribute('name');
      const elemType = elem.getAttribute('type');
      const elemComplexType = AdaptiveProvider.findComplexType(schemaElements, elemType);
      const hasElements = AdaptiveProvider.findComplexTypeChildren(elemComplexType).length > 0;
      availableItems.push({
        label: elemName,
        insertText: AdaptiveProvider.generateInsertText(elemName, wrappedTag, hasElements),
        kind: monaco.languages.CompletionItemKind.Function,
        detail: elemType,
        documentation: 'DOC'
      });
    }
    // return the elements we found
    return availableItems;
  }
  static generateInsertText(elemName: string, wrappedTag: boolean, hasElements: boolean) {
    let defaultAttributes = ' Id="' + AdaptiveProvider.generateId(elemName) + '"';

    let childrenOfElement = '\n'
    switch (elemName) {
      case 'TextBlock':
        defaultAttributes += " Wrap=\"true\"";
        childrenOfElement = "New TextBlock";
        hasElements=true
        break;
      case 'Input.Text':
        defaultAttributes += " Placeholder=\"Placeholder text\"";
        break;
      case 'Image':
        defaultAttributes += " Url=\"Image Url\" AltText=\"Image\"";
        break;
      case 'Column':
        defaultAttributes += " Width=\"stretch\"";
        break;

      case 'FactSet':
        childrenOfElement = `
  <Fact Title="Fact 1" Value="Value 1"/>
  <Fact Title="Fact 2" Value="Value 2"/>
`;
        break;

      case 'ColumnSet':
        const search = '<Column ';
        const count = this.getOccurrences(this.card, search) + 1;
        childrenOfElement = `  
  <Column Id="${AdaptiveProvider.generateId("Column")}"  Width="stretch">
  </Column>
`;
        break;

      default:
        break;
    }
    return (wrappedTag ? '' : '\n<') + elemName + defaultAttributes + (hasElements ? '>' + childrenOfElement + '</' + elemName + (wrappedTag ? '' : '>') : '/' + (wrappedTag ? '' : '>'));
  }

  static getOccurrences(card, subString) {
    if (subString.length <= 0) {
      return 0;
    }

    let n = 0
    let pos = 0
    const step = subString.length;

    while (true) {
      pos = card.indexOf(subString, pos);
      if (pos >= 0) {
        n++;
        pos += step;
      } else break;
    }
    return n;
  }

  static generateId(elemName: string) {
    const search = '<' + elemName + ' ';
    const count = this.getOccurrences(this.card, search) + 1;
    let lowerVariableKey = elemName.charAt(0).toLowerCase() + elemName.slice(1);
    return lowerVariableKey + '-' + count;
  }
  public static getElementAvailableAttributes(schemaElements, element: any, usedChildTags) {
    const availableItems = [];
    const complexType = AdaptiveProvider.findComplexType(schemaElements, element.getAttribute('type'));
    const complexTypeAttributes = AdaptiveProvider.findComplexTypeAttributes(complexType);
    for (var i = 0; i < complexTypeAttributes.length; i++) {
      // get all attributes for the element
      const attr: any = complexTypeAttributes[i];
      const attrName = attr.getAttribute('name');
      if (usedChildTags.length === 0 || !usedChildTags.includes(attrName)) {
        const attrType = attr.getAttribute('type');
        availableItems.push({
          label: attrName,
          insertText: attrName + '=\"\" ',
          kind: monaco.languages.CompletionItemKind.Property,
          detail: attrType,
          documentation: 'DOC' // TODO
        });
      }
    }
    return availableItems;
  }
  public static findComplexTypeChildren(complexType) {
    const childrenElements = [];
    for (let index = 0; index < complexType.children.length; index++) {
      const element = complexType.children[index];
      if (element.tagName === 'sequence') {
        childrenElements.push(...AdaptiveProvider.getSequenceArray(element));
      }
      else if (element.tagName === 'complexContent') {
        childrenElements.push(...AdaptiveProvider.handleComplexContentChildren(element, 'elements'));
      }
    }
    return childrenElements;
  }

  static resolveSimpleType(simpleType: any): any {
    const childrenElements = [];
    for (let index = 0; index < simpleType.children.length; index++) {
      const element = simpleType.children[index];
      if (element.tagName === 'restriction') {
        const elementType = element.getAttribute('base');
        childrenElements.push(...AdaptiveProvider.getRestrictionArray(element, elementType.replace('xs:', '')));
      }
    }
    return childrenElements;
  }
  static getRestrictionArray(restriction: any, attrType: string) {
    const childrenElements = [];
    for (let index = 0; index < restriction.children.length; index++) {
      const element = restriction.children[index];
      if (element.tagName === 'enumeration') {
        const elementValue = element.getAttribute('value');
        childrenElements.push({
          label: elementValue,
          insertText: elementValue,
          kind: monaco.languages.CompletionItemKind.EnumMember,
          detail: attrType
        });
      }
    }
    return childrenElements;
  }
  public static getSequenceArray(sequence): any[] {
    const childrenElements = [];
    for (let index = 0; index < sequence.children.length; index++) {
      const element = sequence.children[index];
      if (element.tagName === 'element') {
        childrenElements.push(element);
      }
    }
    return childrenElements;
  }
  public static findComplexTypeAttributes(complexType) {
    const attributes = [];
    for (let index = 0; index < complexType.children.length; index++) {
      const element = complexType.children[index];
      // handle complexType attributes
      if (element.tagName === 'attribute') {
        attributes.push(element);
      }
      else if (element.tagName === 'complexContent') {
        attributes.push(...AdaptiveProvider.handleComplexContentChildren(element, 'attributes'));
      }
    }
    return attributes;
  }
  public static handleComplexContentChildren(complexContent: any, childrenType: string) {
    const childrenElements = [];
    for (let index = 0; index < complexContent.children.length; index++) {
      const element = complexContent.children[index];
      // handle complexContent extension
      if (element.tagName === 'extension') {
        childrenElements.push(...AdaptiveProvider.handleExtensionChildren(element, childrenType));
      }
    }
    return childrenElements;
  }
  public static handleExtensionChildren(extension: any, childrenType: string) {
    const childrenElements = [];
    for (let index = 0; index < extension.children.length; index++) {
      const element = extension.children[index];
      // handle extension sequence
      if (childrenType === 'elements' && element.tagName === 'sequence') {
        childrenElements.push(...AdaptiveProvider.getSequenceArray(element));
      }
      // handle extension attributes
      if (childrenType === 'attributes' && element.tagName === 'attribute') {
        childrenElements.push(element);
      }
    }
    // handle extension base
    if (extension.getAttribute('base')) {
      // handle when base is complexType
      const baseType = AdaptiveProvider.findComplexType(AdaptiveProvider.schemaNode(), extension.getAttribute('base'));
      if (baseType) {
        if (childrenType === 'attributes') {
          childrenElements.push(...AdaptiveProvider.findComplexTypeAttributes(baseType));
        } else if (childrenType === 'elements') {
          childrenElements.push(...AdaptiveProvider.findComplexTypeChildren(baseType));
        }
      }
    }
    return childrenElements;
  }
  public static findComplexType(element, type) {
    let res = null;
    for (let index = 0; index < element.children.length; index++) {
      const childElement = element.children[index];
      if (childElement.tagName === 'complexType' && childElement.getAttribute('name') === type) {
        res = childElement;
        return childElement;
      }
    }
    return res;
  }
  public static findSimpleType(element, type) {
    let res = null;
    for (let index = 0; index < element.children.length; index++) {
      const childElement = element.children[index];
      if (childElement.tagName === 'simpleType' && childElement.getAttribute('name') === type) {
        res = childElement;
        return childElement;
      }
    }
    return res;
  }
  public static formatXml(xml, indent?, tabs?): string {
    indent = indent ?? '\t'; // can be specified by second argument of the function
    tabs = tabs ?? '';  // store the current indentation
    var result = xml.replace(
      /\s*<[^>\/]*>[^<>]*<\/[^>]*>|\s*<.+?>|\s*[^<]+/g, // pattern to match nodes (angled brackets or text)
      (m, i) => {
        m = m.replace(/^\s+|\s+$/g, '');  // trim the match just in case

        if (i < 38) { if (/^<[?]xml/.test(m)) { return m + '\n'; } }  // if the match is a header, ignore it

        if (/^<[/]/.test(m))  // if the match is a closing tag
        {
          tabs = tabs.replace(indent, '');  // remove one indent from the store
          m = tabs + m;  // add the tabs at the beginning of the match
        }
        else if (/<.*>.*<\/.*>|<.*[^>]\/>/.test(m))  // if the match contains an entire node
        {
          // leave the store as is or
          m = m.replace(/(<[^\/>]*)><[\/][^>]*>/g, '$1 />');  // join opening with closing tags of the same node to one entire node if no content is between them
          m = tabs + m; // add the tabs at the beginning of the match
        }
        else if (/<.*>/.test(m)) // if the match starts with an opening tag and does not contain an entire node
        {
          m = tabs + m;  // add the tabs at the beginning of the match
          tabs += indent;  // and add one indent to the store
        }
        else  // if the match contain a text node
        {
          m = tabs + m;  // add the tabs at the beginning of the match
        }
        // return m+"\n";
        return '\n' + m; // content has additional space(match) from header
      }// anonymous function
    );
    return result;
  };
  /// TODO USE Maybe later
  public static getItemDocumentation(element) {
    for (let i = 0; i < element.children.length; i++) {
      // annotation contains documentation, so calculate the
      // documentation from it's child elements
      if (element.children[i].tagName === 'annotation') {
        return AdaptiveProvider.getItemDocumentation(element.children[0]);
      }
      // if it's the documentation element, just get the value
      else if (element.children[i].tagName === 'documentation') {
        return element.children[i].textContent;
      }
    }
  }
}
