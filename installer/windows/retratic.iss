; Retratic theme installer for OBS Studio on Windows (per user, no admin needed).
; Build after "npm run distrib":
;   ISCC.exe /DVersion=1.2.3 /DVersionNumeric=1.2.3.0 installer\windows\retratic.iss

#ifndef Version
  #define Version "0.0.0"
#endif
#ifndef VersionNumeric
  #define VersionNumeric "0.0.0.0"
#endif

[Setup]
AppId={{8F2B6C1E-5D4A-4F7B-9E3C-2A6D1B0C7E94}
AppName=Retratic for OBS Studio
AppVersion={#Version}
AppPublisher=Narta Xaymar Dirks
AppPublisherURL=https://github.com/Xaymar/obs-retratic
VersionInfoVersion={#VersionNumeric}
PrivilegesRequired=lowest
DefaultDirName={userappdata}\obs-studio\themes
DisableDirPage=yes
DisableProgramGroupPage=yes
Uninstallable=yes
; Keep the uninstaller out of OBS's themes folder.
UninstallFilesDir={localappdata}\Programs\Retratic
UninstallDisplayName=Retratic for OBS Studio
OutputDir=..\..\installers
OutputBaseFilename=retratic-{#Version}-windows
Compression=lzma2
SolidCompression=yes
WizardStyle=modern

[InstallDelete]
; Remove what a previous version installed, so renamed or dropped styles don't linger.
Type: files; Name: "{app}\Retratic.obt"
Type: files; Name: "{app}\Retratic_*.ovt"
Type: filesandordirs; Name: "{app}\Retratic"

[Files]
Source: "..\..\distrib\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[UninstallDelete]
Type: filesandordirs; Name: "{app}\Retratic"

[Messages]
FinishedLabel=Retratic has been installed. Restart OBS Studio, then pick Retratic under Settings > Appearance.
