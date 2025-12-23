// Tema baseado na logo "Blog do Saber"
export const theme = {
  colors: {
    // Cores principais da logo
    primary: '#2E7D32',        // Verde floresta (faixa principal)
    primaryDark: '#1B5E20',    // Verde escuro
    primaryLight: '#66BB6A',   // Verde claro
    secondary: '#FF8F00',      // Laranja/Dourado (bordas)
    secondaryDark: '#E65100',  // Laranja escuro
    secondaryLight: '#FFB300', // Dourado claro
    accent: '#1976D2',         // Azul (chapéu, globo)
    accentLight: '#42A5F5',    // Azul claro
    highlight: '#FDD835',      // Amarelo (lâmpada)

    // Estados
    success: '#4CAF50',
    warning: '#FF9800',
    danger: '#F44336',
    info: '#2196F3',

    // Backgrounds
    background: '#F5F5F5',     // Cinza muito claro
    backgroundLight: '#FAFAFA', // Quase branco
    surface: '#FFFFFF',        // Branco
    card: '#FFFFFF',

    // Textos
    text: '#212121',           // Quase preto
    textSecondary: '#757575',  // Cinza médio
    textLight: '#9E9E9E',      // Cinza claro
    textOnPrimary: '#FFFFFF',  // Branco em fundos coloridos
    textOnSecondary: '#FFFFFF',

    // Bordas
    border: '#E0E0E0',
    borderLight: '#F5F5F5',
    divider: '#EEEEEE',

    // Outros
    disabled: '#BDBDBD',
    placeholder: '#9E9E9E',
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.3)',
  },

  fonts: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    sizes: {
      xs: 11,
      sm: 13,
      md: 15,
      lg: 17,
      xl: 20,
      xxl: 24,
      xxxl: 32,
      huge: 40,
    },
    weights: {
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },

  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    round: 9999,
  },

  shadows: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 3,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.16,
      shadowRadius: 12,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.2,
      shadowRadius: 20,
      elevation: 12,
    },
  },
};
