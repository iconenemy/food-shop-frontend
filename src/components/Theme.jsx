import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
          main: "#ad160c",
        },
        secondary: {
          light: "#F5F5F5",
          main: "#FFF",
          contrastText: "#F5F5F5",
        }
      },
      neutral: {
        main: '#d21976',
        contrastText: '#fff',
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