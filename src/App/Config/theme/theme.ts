import defaultTheme from './theme.default'

export function createTheme(tenantTheme: any): any {
  // const tenantTheme = await import(`./theme.${tenant}`);
  // console.log('tenantTheme = ', tenantTheme);

  return {
    ...defaultTheme,
    ...tenantTheme
  }
}
