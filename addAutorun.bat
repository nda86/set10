reg add HKLM\Software\Microsoft\Windows\CurrentVersion\Run /v set10_erp /t REG_SZ /d %~dp0erp2.exe
reg add HKLM\Software\Microsoft\Windows\CurrentVersion\Run /v set10_watcher /t REG_SZ /d %~dp0watcher2.exe
pause