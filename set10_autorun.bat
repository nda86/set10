@echo off
IF EXIST "%PROGRAMFILES(X86)%" ("c:\Program Files (x86)\nodejs\node.exe" %~dp0index.js >> %~dp0log.txt) else ("c:\Program Files\nodejs\node.exe" %~dp0index.js >> %~dp0log.txt)
echo "error..."
pause