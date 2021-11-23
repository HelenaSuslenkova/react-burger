import AppHeader from '../../components/app-header/app-header';

export function CommonLayout({ children }) {
  return(
    <>
      <AppHeader />
      {children}
    </>
  );
};
