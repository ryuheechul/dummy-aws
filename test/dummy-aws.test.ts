import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as DummyAws from '../lib/dummy-aws-stack';

test('SQS Queue Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new DummyAws.DummyAwsStack(app, 'MyTestStack');
  // THEN
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: 'nodejs12.x'
  });
});
