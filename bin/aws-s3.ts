#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AwsS3Stack } from "../src/lib/aws-s3-stack";

const app = new cdk.App();
new AwsS3Stack(app, "AwsS3Stack", {});
