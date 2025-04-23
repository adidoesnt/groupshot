#!/bin/bash

set -e

create_bucket() {
    echo "Creating bucket groupshot-dev-bucket..."
    # Change the bucket name if you want, but remember to update the bucket name in the .env file if you do
    if ! awslocal s3 ls s3://groupshot-dev-bucket 2>/dev/null; then
        awslocal s3 mb s3://groupshot-dev-bucket

        setup_cors

        check_bucket
    else
        echo "Bucket already exists"
    fi
}

setup_cors() {
    echo "Setting CORS configuration..."
    awslocal s3api put-bucket-cors --bucket groupshot-dev-bucket --cors-configuration '{
            "CORSRules": [
                {
                    "AllowedHeaders": ["*"],
                    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
                    "AllowedOrigins": ["*"],
                    "ExposeHeaders": ["ETag"],
                    "MaxAgeSeconds": 3000
                }
            ]
        }' 2> /dev/null
}

check_bucket() {
    echo "Checking bucket exists..."
    if awslocal s3 ls s3://groupshot-dev-bucket 2>/dev/null; then
        echo "Bucket exists and is accessible"

        # Verify CORS configuration
        echo "Verifying CORS configuration..."
        awslocal s3api get-bucket-cors --bucket groupshot-dev-bucket
    else
        echo "Error: Bucket does not exist or is not accessible"
        exit 1
    fi
}

create_bucket

echo "LocalStack setup completed successfully"
