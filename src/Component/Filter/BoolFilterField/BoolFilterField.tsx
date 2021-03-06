import * as React from 'react';

import { Checkbox, Form } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';

// default props
interface BoolFilterFieldDefaultProps {
  /** Label for this field */
  label: string;
  /** Initial value set to the field */
  value: boolean;
}
// non default props
export interface BoolFilterFieldProps extends Partial<BoolFilterFieldDefaultProps> {
  /** Callback function for onChange */
  onValueChange?: ((newValue: boolean) => void);
}
// state
interface BoolFilterFieldState {
  value: boolean;
}

/**
 * Checkbox field for a boolean filter value.
 */
export class BoolFilterField extends React.Component<BoolFilterFieldProps, BoolFilterFieldState> {

  public static defaultProps: BoolFilterFieldDefaultProps = {
    label: 'Value',
    value: false
  };

  constructor(props: BoolFilterFieldProps) {
    super(props);
    this.state = {
      value: this.props.value ? true : false
    };
  }

  static getDerivedStateFromProps(
      nextProps: BoolFilterFieldProps,
      prevState: BoolFilterFieldState): Partial<BoolFilterFieldState> {
    return {
      value: nextProps.value
    };
  }

  /**
   * Extracts the boolean value out of the CheckboxChangeEvent of 'onChange'
   * and passes it to the passed in 'onValueChange' handler.
   */
  onChange = (e: CheckboxChangeEvent) => {
    const {
      onValueChange
    } = this.props;

    if (onValueChange) {
      onValueChange(e.target.checked);
    }

    this.setState({value: e.target.checked});
  }

  render() {

    return (
      <div className="gs-text-filter-fld">

        <Form.Item label={this.props.label} colon={false} >

          <Checkbox
            checked={this.state.value === true}
            onChange={this.onChange}
          />

        </Form.Item>

      </div>
    );
  }
}

export default BoolFilterField;
