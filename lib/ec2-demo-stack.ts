import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class Ec2DemoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this, 'CdkDemoVpc', {
      vpcName: 'VpcDemoStack/CdkDemoVpc'
    });

    const instance = new ec2.Instance(this, 'CdkDemoInstance', {
      vpc: vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
        kernel: ec2.AmazonLinuxKernel.KERNEL5_X,
      }),
      keyName: 'rkw_home',
    })
    instance.connections.allowFromAnyIpv4(ec2.Port.tcp(22));
  }
}