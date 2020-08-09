import * as React from 'react';
import {PureComponent} from 'react';

export default class EventInfo extends PureComponent {
  render() {
    const {info} = this.props;
    const displayName = `${info.summary}`; //Can add address here

    return (
      <div>
        <div>
          {displayName} |{' '}
          <p>
            {info.description}
          </p>
        </div>
    </div>
    );
  }
}