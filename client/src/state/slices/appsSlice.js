import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apps: [
    // SYSTEM APPS
    {
      appId: "explorer",
      title: "File Explorer",
      icon: "/icons/explorer.png",
      bootstrapIcon: null,
      type: "system",
      component: "ExplorerApp",
      launchArgs: { path: "C:/" },
      description: "Browse files and folders",
      canUninstall: false,
      allowMultipleInstances: true,
    },
    {
      appId: "this-pc",
      title: "This PC",
      icon: "/icons/this-pc.avif",
      bootstrapIcon: null,
      type: "system",
      component: "ExplorerApp",
      launchArgs: { path: "C:/This PC" },
      description: "Access drives and folders",
      canUninstall: false,
      allowMultipleInstances: true,
    },
    {
      appId: "recycle-bin",
      title: "Recycle Bin",
      icon: "/icons/recycle-bin.webp",
      bootstrapIcon: null,
      type: "system",
      component: "ExplorerApp",
      launchArgs: { path: "C:/Recycle Bin" },
      description: "View and restore deleted files",
      canUninstall: false,
      allowMultipleInstances: false,
    },
    {
      appId: "settings",
      title: "Settings",
      icon: null,
      bootstrapIcon: "gear",
      type: "system",
      component: "SettingsApp",
      description: "Manage your system preferences",
      canUninstall: false,
      allowMultipleInstances: false,
    },
    {
      appId: "readme",
      title: "README",
      icon: null,
      bootstrapIcon: "filetypeMd",
      type: "system",
      component: "ReadmeApp",
      description: "Windows-Web Details and Admin Credits",
      canUninstall: false,
      allowMultipleInstances: false,
    },

    // DEFAULT PRE-INSTALLED APPS
  ],
};

const appsSlice = createSlice({
  name: "apps",
  initialState,
  reducers: {},
});

export const {} = appsSlice.actions;
export default appsSlice.reducer;
