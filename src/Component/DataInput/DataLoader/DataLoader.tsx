import * as React from 'react';

import { Select } from 'antd';
const Option = Select.Option;
import 'antd/dist/antd.css';

import {
  Data as GsData,
  DataParserConstructable as GsDataParserConstructable
} from 'geostyler-data';

import UploadButton from '../../UploadButton/UploadButton';

// default props
interface DefaultDataLoaderProps {
  onDataRead: (data: GsData) => void;
}
// non default props
interface DataLoaderProps extends Partial<DefaultDataLoaderProps> {
  parsers: GsDataParserConstructable[];
}

// state
interface DataLoaderState {
  activeParser?: GsDataParserConstructable;
}

class DataLoader extends React.Component<DataLoaderProps, DataLoaderState> {

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  public static defaultProps: DefaultDataLoaderProps = {
    onDataRead: (data: GsData) => {return; }
  };

  parseData = (uploadObject: any) => {
    const {
      activeParser
    } = this.state;
    if (!activeParser) {
      return;
    }
    const parser = new activeParser();
    const file = uploadObject.file as File;
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const fileContent = reader.result;
      // TODO Remove JSON.parse when type of readData is more precise
      parser.readData(JSON.parse(fileContent))
        .then(this.props.onDataRead);
    };
  }

  getParserOptions = () => {
    return this.props.parsers.map((parser: any) => {
      return <Option key={parser.name} value={parser.name}>{parser.name}</Option>;
    });
  }

  onSelect = (selection: string) => {
    const activeParser = this.props.parsers.find(parser => parser.name === selection);
    if (activeParser) {
      this.setState({activeParser});
    }
  }

  render() {
    const {
      activeParser
    } = this.state;

    return (
      <div>
        Data Type:
        <Select
          style={{ width: 300 }}
          onSelect={this.onSelect}
        >
          {this.getParserOptions()}
        </Select>
        {
          activeParser ?
          <UploadButton
            label="Upload Data"
            onUpload={this.parseData}
          /> : null
        }
      </div>
    );
  }
}

export default DataLoader;