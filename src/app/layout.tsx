import "./theme.scss";

import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { Toaster } from "react-hot-toast";

import { SWRConfigWrapper } from "@/lib/swr-wrapper";
import theme from "@/theme";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SWRConfigWrapper>
              <Toaster position="bottom-center" />
              <Box sx={{ height: "100vh" }}>{children}</Box>
            </SWRConfigWrapper>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
