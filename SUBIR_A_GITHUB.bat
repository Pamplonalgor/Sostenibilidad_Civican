@echo off
title Subir Proyecto a GitHub - Civican
echo ========================================================
echo  SUBIENDO PROYECTO CIVICAN A GITHUB
echo  Repositorio: https://github.com/Pamplonalgor/Sostenibilidad_Civican.git
echo ========================================================
echo.

set "PATH=%LOCALAPPDATA%\Programs\MinGit\cmd;%LOCALAPPDATA%\Programs\MinGit\ucrt64\bin;%PATH%"
cd /d "C:\Users\moren\OneDrive\Desktop\Web Evento Algorithmics"

echo Conectando con GitHub... Se abrira la ventana de inicio de sesion en el navegador.
echo.

git push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo  [EXITO] El proyecto se ha subido correctamente a GitHub.
    echo ========================================================
) else (
    echo ========================================================
    echo  [AVISO] Si la autenticacion no se completo, vuelve a intentarlo
    echo  o autoriza en la ventana del navegador.
    echo ========================================================
)
echo.
pause
