// breadcrumbUtils.js

export const replaceDynamicSegments = (path, params) => {

  if(!path) {
    return path;
  }

  if(!params) {
    return params;
  }

 let updatedPath = path;

  // Replace all dynamic segments (like ":company_id") with actual values from params
  Object.keys(params).forEach((paramKey) => {
    updatedPath = updatedPath.replace(`:${paramKey}`, params[paramKey]);
  });

  return updatedPath;

};

export const findBreadcrumbPath = (locationPath, sidebarConfig, params) => {
  const breadcrumbPaths = [];

  sidebarConfig.forEach((item) => {
    const itemPath = replaceDynamicSegments(item.path, params); // Replace dynamic segments in the path
    const regex = new RegExp(`^${itemPath}`);

    if (regex.test(locationPath)) {
      breadcrumbPaths.push({
        ...item,
        path: itemPath, // Replace for display
      });

      if (item.sublinks) {
        item.sublinks.forEach((sublink) => {
          const sublinkPath = replaceDynamicSegments(sublink.path, params);
          const sublinkRegex = new RegExp(`^${sublinkPath}`);
          if (sublinkRegex.test(locationPath)) {
            breadcrumbPaths.push({
              ...sublink,
              text: params[sublink.text.toLowerCase()] || sublink.text, // Show actual param or default text
              path: sublinkPath,
            });
          }
        });
      }
    }
  });

  return breadcrumbPaths;
};
