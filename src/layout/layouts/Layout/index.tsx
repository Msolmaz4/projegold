import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext, useLayoutContext } from "hooks";
import { Header, Sidebar, SubSidebar } from "layout";
import { Loading } from "core";
import { NewVersionTracker } from "components";
import { isAuthRoute } from "routes";
import useStyles from "./styles";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { classes, cx } = useStyles();
  const authContext = useAuthContext();
  const layoutContext = useLayoutContext();

  const { pathname } = useLocation();

  const authRoute = isAuthRoute(pathname);

  useEffect(() => {
    const lockMenuFromLocalStorage = localStorage.getItem("lockMenu");
    if (lockMenuFromLocalStorage === "true") {
      layoutContext.setMenuOpen(true);
      layoutContext.setMenuLocked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "lockMenu",
      layoutContext.menuLocked ? "true" : "false",
    );
    if (layoutContext.menuLocked) layoutContext.setMenuOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutContext.menuLocked]);

  return (
    <div className={classes.App}>
      <NewVersionTracker />

      {!authRoute && <Sidebar />}
      {!authRoute && <SubSidebar />}

      <div
        className={cx(
          classes.dashboard,
          layoutContext.menuOpen || layoutContext.subMenuOpen ? "menuOpen" : "",
        )}
      >
        <Header layoutType={authRoute ? "authLayout" : "layout"} />
        <main
          className={
            authRoute
              ? classes.authContent
              : cx(
                  classes.contentContainer,
                  layoutContext.menuOpen || layoutContext.subMenuOpen
                    ? null
                    : classes.contentContainerMenuClosed,
                )
          }
        >
          <div className={classes.content}>
            {authContext.isLoading ? <Loading size="33px" /> : children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
