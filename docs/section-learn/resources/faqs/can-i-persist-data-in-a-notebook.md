# Can I persist data in a notebook?

You can persist data in the notebook by either setting the `use_temp_dir` flag to false in `px.launch_app` which will persist your data in SQLite on your disk at the **PHOENIX\_WORKING\_DIR**. Alternatively you can deploy a phoenix instance and point to it via **PHOENIX\_COLLECTOR\_ENDPOINT**.
