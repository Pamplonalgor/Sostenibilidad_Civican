@echo off
title Subir Proyecto a GitHub - Civican
echo ========================================================
echo  SUBIENDO PROYECTO CIVICAN A GITHUB
echo  Repositorio: https://github.com/Pamplonalgor/Sostenibilidad_Civican.git
echo ========================================================
echo.
cd /d "C:\Users\moren\OneDrive\Desktop\Web Evento Algorithmics"
"%LOCALAPPDATA%\Programs\MinGit\cmd\git.exe" push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo [EXITO] El proyecto se ha subido correctamente a GitHub.
) else (
    echo [ERROR] Hubo un problema al subir. Revisa tus credenciales de GitHub.
)
echo.
pause
