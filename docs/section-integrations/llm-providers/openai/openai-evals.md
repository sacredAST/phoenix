---
description: Configure and run OpenAI for evals
---

# OpenAI Evals

### OpenAIModel

{% hint style="info" %}
Need to install the extra dependencies `openai>=1.0.0`
{% endhint %}

```python
class OpenAIModel:
    api_key: Optional[str] = field(repr=False, default=None)
    """Your OpenAI key. If not provided, will be read from the environment variable"""
    organization: Optional[str] = field(repr=False, default=None)
    """
    The organization to use for the OpenAI API. If not provided, will default
    to what's configured in OpenAI
    """
    base_url: Optional[str] = field(repr=False, default=None)
    """
    An optional base URL to use for the OpenAI API. If not provided, will default
    to what's configured in OpenAI
    """
    model: str = "gpt-4"
    """Model name to use. In of azure, this is the deployment name such as gpt-35-instant"""
    temperature: float = 0.0
    """What sampling temperature to use."""
    max_tokens: int = 256
    """The maximum number of tokens to generate in the completion.
    -1 returns as many tokens as possible given the prompt and
    the models maximal context size."""
    top_p: float = 1
    """Total probability mass of tokens to consider at each step."""
    frequency_penalty: float = 0
    """Penalizes repeated tokens according to frequency."""
    presence_penalty: float = 0
    """Penalizes repeated tokens."""
    n: int = 1
    """How many completions to generate for each prompt."""
    model_kwargs: Dict[str, Any] = field(default_factory=dict)
    """Holds any model parameters valid for `create` call not explicitly specified."""
    batch_size: int = 20
    """Batch size to use when passing multiple documents to generate."""
    request_timeout: Optional[Union[float, Tuple[float, float]]] = None
    """Timeout for requests to OpenAI completion API. Default is 600 seconds."""
```

{% hint style="info" %}
All models newer than GPT 3.5 Turbo are tested regularly. If you're using an older model than that, you may run into deprecated API parameters.
{% endhint %}

To authenticate with OpenAI you will need, at a minimum, an API key. The model class will look for it in your environment, or you can pass it via argument as shown above. In addition, you can choose the specific name of the model you want to use and its configuration parameters. The default values specified above are common default values from OpenAI. Quickly instantiate your model as follows:

```python
model = OpenAI()
model("Hello there, this is a test if you are working?")
# Output: "Hello! I'm working perfectly. How can I assist you today?"
```

### Azure OpenAI

The code snippet below shows how to initialize `OpenAIModel` for Azure:

```python
model = OpenAIModel(
    model="gpt-35-turbo-16k",
    azure_endpoint="https://arize-internal-llm.openai.azure.com/",
    api_version="2023-09-15-preview",
)
```

{% hint style="info" %}
Note that the `model` param is actually the `engine` of your deployment. You may get a `DeploymentNotFound` error if this parameter is not correct. You can find your engine param in the Azure OpenAI playground.\
\\
{% endhint %}

<figure><img src="https://storage.googleapis.com/arize-assets/phoenix/assets/images/azure_openai_engine.png" alt=""><figcaption><p>How to find the model param in Azure</p></figcaption></figure>

Azure OpenAI supports specific options:

```python
api_version: str = field(default=None)
"""
The verion of the API that is provisioned
https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#rest-api-versioning
"""
azure_endpoint: Optional[str] = field(default=None)
"""
The endpoint to use for azure openai. Available in the azure portal.
https://learn.microsoft.com/en-us/azure/cognitive-services/openai/how-to/create-resource?pivots=web-portal#create-a-resource
"""
azure_deployment: Optional[str] = field(default=None)
azure_ad_token: Optional[str] = field(default=None)
azure_ad_token_provider: Optional[Callable[[], str]] = field(default=None)

```

For full details on Azure OpenAI, check out the [OpenAI Documentation](https://github.com/openai/openai-python#microsoft-azure-openai)
