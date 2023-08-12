@echo off
setlocal enabledelayedexpansion

REM Get the directory where the batch script is located
set "scriptDir=%~dp0"

REM Navigate up one directory from the script location to reach the repository root
pushd "%scriptDir%.."

REM Read the version from package.json
for /f "usebackq tokens=2 delims=: " %%i in ("package.json") do (
    set "version=%%~i"
    goto :done
)
:done

REM Remove quotes, leading/trailing spaces, and commas from the version
set "version=!version:"=!"
set "version=!version: =!"
set "version=!version:,=!"

REM Echo the extracted version for testing
echo Version: !version!

REM Get the current date and time
for /f "tokens=2 delims==" %%d in ('wmic OS Get localdatetime /value') do (
    set "currentDateTime=%%d"
)

REM Format the current date and time as YYYY-MM-DD_HH-MM-SS
set "currentDate=!currentDateTime:~0,4!-!currentDateTime:~4,2!-!currentDateTime:~6,2!"
set "currentTime=!currentDateTime:~8,2!-!currentDateTime:~10,2!-!currentDateTime:~12,2!"


REM Define other relative paths and file details
set "distFolder=dist"
set "buildsFolder=builds"
set "zipFileName=!buildsFolder!\v!version!_!currentDate!_!currentTime!.zip"

REM Create the zip file using 7-Zip
"C:\Program Files\7-Zip\7z.exe" a -tzip "%zipFileName%" "%distFolder%\*"

echo Zip created: %zipFileName%

REM Return to the script directory
popd

endlocal