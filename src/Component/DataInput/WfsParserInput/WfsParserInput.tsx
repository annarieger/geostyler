import * as React from 'react';

import {
  Form,
  Button,
  Input,
  Select,
  InputNumber
} from 'antd';
const Option = Select.Option;

const _get = require('lodash/get');

import './WfsParserInput.css';

// TODO should be replaced with import {ReadParams} from 'geostyler-wfs-parser'
// once it exists
interface ReadParams {
  url: string;
  version: string;
  typeName: string;
  featureID?: string;
  propertyName?: string[];
  maxFeatures?: number;
  fetchParams?: Object;
}

// default props
interface WfsParserInputDefaultProps {
  requestButtonText: string;
  urlLabel: string;
  versionLabel: string;
  typeNameLabel: string;
  featureIDLabel: string;
  propertyNameLabel: string;
  maxFeaturesLabel: string;
  fetchParamsLabel: string;
}

// non default props
interface WfsParserInputProps extends Partial<WfsParserInputDefaultProps> {
  onClick: ((wfsParams: ReadParams) => void);
}

// state
interface WfsParserState extends ReadParams {
  validation: any;
}

/**
 * WfsParserInput
 */
class WfsParserInput extends React.Component<WfsParserInputProps, WfsParserState> {

  public static defaultProps: WfsParserInputDefaultProps = {
    requestButtonText: 'Get Data',
    urlLabel: 'Url',
    versionLabel: 'Version',
    typeNameLabel: 'FeatureTypeName',
    featureIDLabel: 'FeatureID',
    propertyNameLabel: 'PropertyName',
    maxFeaturesLabel: 'MaxFeatures',
    fetchParamsLabel: 'fetchParams'
  };

  constructor(props: any) {
    super(props);
    this.state = {
      url: 'https://ows.terrestris.de/geoserver/terrestris/ows',
      version: '1.1.0',
      typeName: 'terrestris:bundeslaender',
      maxFeatures: 10,
      validation: {
        url: undefined,
        version: undefined,
        typeName: undefined,
        featureID: undefined,
        propertyName: undefined,
        maxFeatures: undefined,
        fetchParams: undefined
      }
    };
  }

  onUrlChange = (event: any) => {
    const url = event.target.value;
    let urlValidation = {};
    if (url.length <= 0) {
      urlValidation = {
        status: 'error',
        message: 'Url is required'
      };
    }
    this.setState({
      url,
      validation: {
        ...this.state.validation,
        url: urlValidation
      }
    });
  }

  onTypeNameChange = (event: any) => {
    const typeName = event.target.value;
    let typeNameValidation = {};
    if (typeName.length <= 0) {
      typeNameValidation = {
        status: 'error',
        message: 'TypeName is required'
      };
    }
    this.setState({
      typeName,
      validation: {
        ...this.state.validation,
        typeName: typeNameValidation
      }
    });
    this.setState({typeName});
  }

  onVersionChange = (version: string) => {
    let versionValidation = {};
    if (version.length <= 0) {
      versionValidation = {
        status: 'error',
        message: 'Version is required'
      };
    }
    this.setState({
      version,
      validation: {
        ...this.state.validation,
        version: versionValidation
      }
    });
    this.setState({version});
  }

  onFeatureIDChange = (event: any) => {
    const featureID = event.target.value;
    this.setState({featureID});
  }

  onPropertyNameChange = (propertyName: string[]) => {
    this.setState({propertyName});
  }

  onMaxFeaturesChange = (maxFeatures: number) => {
    this.setState({maxFeatures});
  }

  onClick = () => {
    this.props.onClick(this.state);
  }

  render() {
    const {
      requestButtonText
    } = this.props;

    const {
      url,
      version,
      typeName,
      maxFeatures,
      propertyName,
      featureID
    } = this.state;

    return (
      <div className="wfs-parser-input">
        <Form.Item
          label={this.props.urlLabel}
          validateStatus={_get(this.state, 'validation.url.status')}
          help={_get(this.state, 'validation.url.message')}
          hasFeedback={true}
          required={true}
        >
          <Input
            value={url}
            onChange={this.onUrlChange}
          />
        </Form.Item>
        <Form.Item
          label={this.props.typeNameLabel}
          validateStatus={_get(this.state, 'validation.typeName.status')}
          help={_get(this.state, 'validation.typeName.message')}
          hasFeedback={true}
          required={true}
        >
          <Input
            value={typeName}
            onChange={this.onTypeNameChange}
          />
        </Form.Item>
        <Form.Item
          label={this.props.versionLabel}
          validateStatus={_get(this.state, 'validation.version.status')}
          help={_get(this.state, 'validation.version.message')}
          hasFeedback={true}
          required={true}
        >
          <Select
            style={{width: '100%'}}
            value={version}
            onChange={this.onVersionChange}
          >
            <Option value="1.0.0">1.0.0</Option>
            <Option value="1.1.0">1.1.0</Option>
            <Option value="1.1.3">1.1.3</Option>
            <Option value="2.0">2.0</Option>
            <Option value="2.0.2">2.0.2</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={this.props.featureIDLabel}
          validateStatus={_get(this.state, 'validation.featureID.status')}
          help={_get(this.state, 'validation.featureID.message')}
          hasFeedback={true}
        >
          <Input
            value={featureID}
            onChange={this.onFeatureIDChange}
          />
        </Form.Item>
        <Form.Item
          label={this.props.propertyNameLabel}
          validateStatus={_get(this.state, 'validation.propertyName.status')}
          help={_get(this.state, 'validation.propertyName.message')}
          hasFeedback={true}
        >
          <Select
            style={{width: '100%'}}
            mode="tags"
            value={propertyName}
            onChange={this.onPropertyNameChange}
          />
        </Form.Item>
        <Form.Item
          label={this.props.maxFeaturesLabel}
          validateStatus={_get(this.state, 'validation.maxFeatures.status')}
          help={_get(this.state, 'validation.maxFeatures.message')}
          hasFeedback={true}
        >
          <InputNumber
            style={{width: '100%'}}
            min={0}
            value={maxFeatures}
            onChange={this.onMaxFeaturesChange}
            precision={0}
          />
        </Form.Item>
        <Form.Item>
          <Button
            className="wfs-parser-submit-button"
            type="primary"
            onClick={this.onClick}
          >
            {requestButtonText}
          </Button>
        </Form.Item>
      </div>
    );
  }
}

export default WfsParserInput;
