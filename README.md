# vscode_openFlow
A script to open flows in Salesforce from VS Code
How to Install It

    1) Copy openFlow.js to your .vscode/scripts/openFlow.js directory in your project.  I am not sure if there is a global version of this.  
       I tried to put it in my home directory and it didnt work
    2) Copy the tasks.json (or copy its contents into your existing file) into your .vscode/tasks.json directory
    3) Restart Visual Code Studio

How to Run It

    1) You’ve added the VS Code Task (openFlow.js) from here and added a task in .vscode/tasks.json
    2) You’ve opened a *.flow-meta.xml file (a Flow Definition)
    3) Then run:
        Cmd+Shift+P → Tasks: Run Task → Open Flow in Flow Builder
        Or use your keyboard shortcut (like Ctrl+Alt+F)
