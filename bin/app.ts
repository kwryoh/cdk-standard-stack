#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { VpcDemoStack } from '../lib/vpc-demo-stakc';
import { Ec2DemoStack } from '../lib/ec2-demo-stack';

const app = new cdk.App();
const vpc = new VpcDemoStack(app, 'VpcDemoStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION }
});

new Ec2DemoStack(app, 'Ec2DemoStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  vpc: vpc.vpc,
  keyname: 'rkw_home',
});
