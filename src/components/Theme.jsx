import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
          main: "#38757b",
        },
        secondary: {
          light: "#F5F5F5",
          main: "#F5F5F5",
          contrastText: "#F5F5F5",
        },
        admin: {
          main: "498786",
          light: "#F5F5F5"
        }
      },
      components: {
        ListItemIcon: {
          variants: [
            {
              props: { color: 'primary' }
            },
          ],
        },
      }
})