// more info: http://aaron-hoffman.blogspot.com/2016/03/store-amazon-ses-delivery-notifications.html
console.log("Loading function");
var AWS = require('aws-sdk');
//console.log(AWS.config);
var docClient = new AWS.DynamoDB.DocumentClient();



exports.handler = function(event, context) {
    console.log("Received event: ", JSON.stringify(event));

    event.Records.forEach(function(rec) {
        console.log("Current record: ", JSON.stringify(rec));
        
        // partition key, uuid
        var messageId = rec.Sns.MessageId;
        
        var msg = JSON.parse(rec.Sns.Message);
        var message = event.Records[0].Sns.Message;
        
        console.log(messageId);
        console.log(source);
        console.log(rec.Sns.Timestamp);
        
        var params = {
            TableName: "Automation",
            Item: {
          
                Source: message,
                messageId: messageId,
            }
        };
        
        //http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
        docClient.put(params, function(err, data) {
            if (err) {
                console.log("ERROR: " + err);
                context.fail(err);
            }
            else {
                console.log("SUCCESS: " + JSON.stringify(data));
                context.succeed(data);
            }
        });
        console.log("docClient.put() done");
    });
};