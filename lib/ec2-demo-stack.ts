import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as cdk from 'aws-cdk-lib';

interface Ec2DemoStackProps extends StackProps {
  vpc: ec2.Vpc;
  keyname: string;
}

export class Ec2DemoStack extends Stack {
  constructor(scope: Construct, id: string, props: Ec2DemoStackProps) {
    super(scope, id, props);

    const instance = new ec2.Instance(this, 'CdkDemoInstance', {
      vpc: props.vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
        kernel: ec2.AmazonLinuxKernel.KERNEL5_X,
      }),
      keyName: props.keyname,
    });
    instance.connections.allowFromAnyIpv4(ec2.Port.tcp(22));
    instance.connections.allowFromAnyIpv4(ec2.Port.tcp(80));
  }
}