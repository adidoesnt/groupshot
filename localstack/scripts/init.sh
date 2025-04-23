#!/bin/bash

set -e

create_bucket() {
    echo "Creating bucket groupshot-dev-bucket..."
    # Change the bucket name if you want, but remember to update the bucket name in the .env file if you do
    if ! awslocal s3 ls s3://groupshot-dev-bucket 2>/dev/null; then
        awslocal s3 mb s3://groupshot-dev-bucket

        check_bucket
    else
        echo "Bucket already exists"
    fi
}

check_bucket() {
    echo "Checking bucket exists..."
    if awslocal s3 ls s3://groupshot-dev-bucket 2>/dev/null; then
        echo "Bucket exists and is accessible"
    else
        echo "Error: Bucket does not exist or is not accessible"
        exit 1
    fi
}

create_bucket

echo "LocalStack setup completed successfully"
