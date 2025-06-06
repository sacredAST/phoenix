---
description: Configure and run Anthropic for evals
---

# Anthropic Evals

### AnthropicModel

```python
class AnthropicModel(BaseModel):
    model: str = "claude-2.1"
    """The model name to use."""
    temperature: float = 0.0
    """What sampling temperature to use."""
    max_tokens: int = 256
    """The maximum number of tokens to generate in the completion."""
    top_p: float = 1
    """Total probability mass of tokens to consider at each step."""
    top_k: int = 256
    """The cutoff where the model no longer selects the words."""
    stop_sequences: List[str] = field(default_factory=list)
    """If the model encounters a stop sequence, it stops generating further tokens."""
    extra_parameters: Dict[str, Any] = field(default_factory=dict)
    """Any extra parameters to add to the request body (e.g., countPenalty for a21 models)"""
    max_content_size: Optional[int] = None
    """If you're using a fine-tuned model, set this to the maximum content size"""
```

## **Usage**

In this section, we will showcase the methods and properties that our `EvalModels` have. First, instantiate your model from the. Once you've instantiated your `model`, you can get responses from the LLM by simply calling the model and passing a text string.

<pre class="language-python"><code class="lang-python"><strong>model = #Instantiate your Anthropic model here
</strong>model("Hello there, how are you?")
# Output: "As an artificial intelligence, I don't have feelings, 
#          but I'm here and ready to assist you. How can I help you today?"
</code></pre>
