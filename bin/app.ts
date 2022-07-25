#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { VpcDemoStack } from '../lib/vpc-demo-stack';
import { Ec2DemoStack } from '../lib/ec2-demo-stack';

const app = new cdk.App();
const defaultProps = {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  }
};
const network = new VpcDemoStack(app, 'VpcDemoStack', defaultProps);

new Ec2DemoStack(app, 'Ec2DemoStack', {
  ...defaultProps,
  vpc: network.vpc,
  keyname: 'rkw_home',
});
