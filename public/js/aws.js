var AWS_CONFIG = {
	'appId': '984999378273841',
	'roleArn' = 'arn:aws:iam::829041221529:role/shuffleAdministrator',
	'bucketName' = 'shuffle-norcal/mainFeedImages',
	'AWS.config.region' = 'us-west-1',
	'fbUserId' = '' ,
	'bucket' = new AWS.S3({

				    params: {

				        Bucket: bucketName

				    }})

}

// var appId = '984999378273841';

// var roleArn = 'arn:aws:iam::829041221529:role/shuffleAdministrator';

// var bucketName = 'shuffle-norcal/mainFeedImages';

// AWS.config.region = 'us-west-1';

// var fbUserId;

// var bucket = new AWS.S3({

//     params: {

//         Bucket: bucketName

//     }

// });

module.exports = AWS_CONFIG;
