---
description: Configure and run Bedrock for evals
---

# Amazon Bedrock Evals

### BedrockModel

```python
class BedrockModel:
    model_id: str = "anthropic.claude-v2"
    """The model name to use."""
    temperature: float = 0.0
    """What sampling temperature to use."""
    max_tokens: int = 256
    """The maximum number of tokens to generate in the completion."""
    top_p: float = 1
    """Total probability mass of tokens to consider at each step."""
    top_k: int = 256
    """The cutoff where the model no longer selects the words"""
    stop_sequences: List[str] = field(default_factory=list)
    """If the model encounters a stop sequence, it stops generating further tokens. """
    session: Any = None
    """A bedrock session. If provided, a new bedrock client will be created using this session."""
    client = None
    """The bedrock session client. If unset, a new one is created with boto3."""
    max_content_size: Optional[int] = None
    """If you're using a fine-tuned model, set this to the maximum content size"""
    extra_parameters: Dict[str, Any] = field(default_factory=dict)
    """Any extra parameters to add to the request body (e.g., countPenalty for a21 models)"""
```

To Authenticate, the following code is used to instantiate a session and the session is used with Phoenix Evals

```python
import boto3

# Create a Boto3 session
session = boto3.session.Session(
    aws_access_key_id='ACCESS_KEY',
    aws_secret_access_key='SECRET_KEY',
    region_name='us-east-1'  # change to your preferred AWS region
)
```

```python
#If you need to assume a role
# Creating an STS client
sts_client = session.client('sts')

# (optional - if needed) Assuming a role
response = sts_client.assume_role(
    RoleArn="arn:aws:iam::......",
    RoleSessionName="AssumeRoleSession1",
    #(optional) if MFA Required
    SerialNumber='arn:aws:iam::...',
    #Insert current token, needs to be run within x seconds of generation
    TokenCode='PERIODIC_TOKEN'
)

# Your temporary credentials will be available in the response dictionary
temporary_credentials = response['Credentials']

# Creating a new Boto3 session with the temporary credentials
assumed_role_session = boto3.Session(
    aws_access_key_id=temporary_credentials['AccessKeyId'],
    aws_secret_access_key=temporary_credentials['SecretAccessKey'],
    aws_session_token=temporary_credentials['SessionToken'],
    region_name='us-east-1'
)
```

```python
client_bedrock = assumed_role_session.client("bedrock-runtime")
# Arize Model Object - Bedrock ClaudV2 by default
model = BedrockModel(client=client_bedrock)
model("Hello there, how are you?")
# Output: "As an artificial intelligence, I don't have feelings, 
#          but I'm here and ready to assist you. How can I help you today?"
```
