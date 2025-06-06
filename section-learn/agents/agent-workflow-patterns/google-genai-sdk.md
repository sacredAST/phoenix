---
description: Everything you need to know about Google's GenAI framework
---

# Google GenAI SDK (Manual Orchestration)

Google's [GenAI SDK](https://github.com/googleapis/python-genai) is a framework designed to help you interact with Gemini models and models run through VertexAI. Out of all the frameworks detailed in this guide, GenAI SDK is the closest to a base model SDK. While it does provide helpful functions and concepts to streamline tool calling, structured output, and passing files, it does not approach the level of abstraction of frameworks like CrewAI or Autogen.

{% hint style="success" %}
In April 2025, Google launched its ADK framework, which is a more comparable agent orchestration framework to the others on this list.
{% endhint %}

That said, because of the relative simplicity of the GenAI SDK, this guide serves as a good learning tool to show how some of the common agent patterns can be manually implemented.

#### Framework Primitives

GenAI SDK uses `contents` to represent user messages, files, system messages, function calls, and invocation parameters. That creates relatively simple generation calls:

```python
file = client.files.upload(file='a11.txt')
response = client.models.generate_content(
    model='gemini-2.0-flash-001',
    contents=['Could you summarize this file?', file]
)
print(response.text)
```

Content objections can also be composed together in a list:

```python
[
  types.UserContent(
    parts=[
      types.Part.from_text('What is this image about?'),
      types.Part.from_uri(
        file_uri: 'gs://generativeai-downloads/images/scones.jpg',
        mime_type: 'image/jpeg',
      )
    ]
  )
]
```

#### Patterns

Google GenAI does not include built in orchestration patterns.

#### Handoffs and State

GenAI has no concept of handoffs natively.

State is handled by maintaining a list of previous messages and other data in a list of content objections. This is similar to how other model SDKs like OpenAI and Anthropic handle the concept of state. This stands in contrast to the more sophisticated measurements of state present in agent orchestration frameworks.

#### Tools

GenAI does include some conveience features around tool calling. The `types.GenerateContentConfig` method can automatically convert base python functions into signatures. To do this, the SDK will use the function docstring to understand its purpose and arguments.

```python
def get_current_weather(location: str) -> str:
    """Returns the current weather.

    Args:
      location: The city and state, e.g. San Francisco, CA
    """
    return 'sunny'


response = client.models.generate_content(
    model='gemini-2.0-flash-001',
    contents='What is the weather like in Boston?',
    config=types.GenerateContentConfig(tools=[get_current_weather]),
)

print(response.text)
```

GenAI will also automatically call the function and incorporate its return value. This goes a step beyond what similar model SDKs do on other platforms. This behavior can be disabled.

#### Memory

GenAI has no built-in concept of memory.

#### Multi-Agent Collaboration

GenAI has no built-in collaboration strategies. These must be defined manually.

#### Streaming

GenAI supports streaming of both text and image responses:

```python
for chunk in client.models.generate_content_stream(
    model='gemini-2.0-flash-001', contents='Tell me a story in 300 words.'
):
    print(chunk.text, end='')
```

***

### Design Considerations and Limitations

GenAI is the "simplest" framework in this guide, and is closer to a pure model SDK like the OpenAI SDK, rather than an agent framework. It does go a few steps beyond these base SDKs however, notably in tool calling. It is a good option if you're using Gemini models, and want more direct control over your agent system.

| Design Considerations                                           | Limitations                                   |
| --------------------------------------------------------------- | --------------------------------------------- |
| Content approach streamlines message management                 | No built-in orchestration capabilities        |
| Supports automatic tool calling                                 | No state or memory management                 |
| Allows for all agent patterns, but each must be manually set up | Primarily designed to work with Gemini models |

***

## Agent Design Patterns

### Prompt Chaining

This workflow breaks a task into smaller steps, where the output of one agent becomes the input to another. It’s useful when a single prompt can’t reliably handle the full complexity or when you want clarity in intermediate reasoning.

**Notebook:** _Research Agent_\
The agent first researches a topic, then provides an executive summary of its results, then finally recommends future focus directions.

{% embed url="https://colab.research.google.com/github/Arize-ai/phoenix/blob/main/tutorials/agents/google-genai/sequential-agent.ipynb" %}

**How to evaluate**: Check whether each step performs its function correctly and whether the final result meaningfully depends on the intermediate output\
(_e.g., do key points reflect the original research?_)

* Check if the intermediate step (e.g. key point extraction) is meaningful and accurate
* Ensure the final output reflects or builds on the intermediate output
* Compare chained vs. single-step prompting to see if chaining improves quality or structure

***

### Router&#x20;

Routing is used to send inputs to the appropriate downstream agent or workflow based on their content. The routing logic is handled by a dedicated call, often using lightweight classification.

**Notebook**: _Simple Tool Router_\
This agent shows a simple example of routing use inputs to different tools.

{% embed url="https://colab.research.google.com/github/Arize-ai/phoenix/blob/main/tutorials/agents/google-genai/routing-agent.ipynb" %}

**How to evaluate**: Compare the routing decision to human judgment or labeled examples\
(_e.g., did the router choose the right tool for a given input?_)

* Compare routing decisions to human-labeled ground truth or expectations
* Track precision/recall if framed as a classification task
* Monitor for edge cases and routing errors

***

### Evaluator–Optimizer Loop

This pattern uses two agents in a loop: one generates a solution, the other critiques it. The generator revises until the evaluator accepts the result or a retry limit is reached. It’s useful when quality varies across generations.

**Notebook**: _Story Writing Agent_\
An agent generates an initial draft of a story, then a critique agent decides whether the quality is high enough. If not, it asks for a revision.

{% embed url="https://colab.research.google.com/github/Arize-ai/phoenix/blob/main/tutorials/agents/google-genai/evaluator-optimizer-agent.ipynb" %}

**How to evaluate**: Track how many iterations are needed to converge and whether final outputs meet predefined criteria\
(_e.g., is the story engaging, clear, and well-written?_)

* Measure how many iterations are needed to reach an acceptable result
* Evaluate final output quality against criteria like tone, clarity, and specificity
* Compare the evaluator’s judgment to human reviewers to calibrate reliability

***

### Orchestrator + Worker Pattern

In this approach, a central agent coordinates multiple agents, each with a specialized role. It’s helpful when tasks can be broken down and assigned to domain-specific workers.

**Notebook**: _Travel Planning Agent_\
The orchestrator delegates planning a trip for a user, and incorporates a user proxy to improve its quality. The orchestrator delegates to specific functions to plan flights, hotels, and provide general travel recommendations.

{% embed url="https://colab.research.google.com/github/Arize-ai/phoenix/blob/main/tutorials/agents/google-genai/orchestration-agent.ipynb" %}

**How to evaluate**: Assess consistency between subtasks and whether the final output reflects the combined evaluations\
(_e.g., does the final output align with the inputs from each worker agent?_)

* Ensure each worker agent completes its role accurately and in isolation
* Check if the orchestrator integrates worker outputs into a consistent final result
* Look for agreement or contradictions between components

***

### Parallel Agent Execution

When you need to process many inputs using the same logic, parallel execution improves speed and resource efficiency. Agents can be launched concurrently without changing their individual behavior.

**Notebook**: _Parallel Research Agent_\
Multiple research topics are examined simultaneously. Once all are complete, the topics are then synthesized into a final combined report.

{% embed url="https://colab.research.google.com/github/Arize-ai/phoenix/blob/main/tutorials/agents/google-genai/parallelization-agent.ipynb" %}

**How to evaluate**: Ensure results remain consistent with sequential runs and monitor for improvements in latency and throughput\
(_e.g., are topics processed correctly and faster when run in parallel?_)

* Confirm that outputs are consistent with those from a sequential execution
* Track total latency and per-task runtime to assess parallel speedup
* Watch for race conditions, dropped inputs, or silent failures in concurrency

