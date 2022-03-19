import { Stack, StackProps } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';
import * as path from 'path';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';

export class DummyAwsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const fn = new lambda.Function(this, 'TestFunction', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline('exports.handler = function(event, ctx, cb) { console.log("hi hi"); return cb(null, "hi"); }'),
    });

    const rule = new events.Rule(this, 'Schedule Rule', {
      schedule: events.Schedule.cron({ minute: '*' }),
    });
    rule.addTarget(new targets.LambdaFunction(fn));

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'ResourcesQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
