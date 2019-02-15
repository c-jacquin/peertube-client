export interface Config {
  instance: {
    name: string;
    shortDescription: string;
    defaultClientRoute: string;
    defaultNSFWPolicy: string;
    customizations: {
      javascript: string;
      css: string;
    };
  };
  email: {
    enabled: boolean;
  };
  contactForm: {
    enabled: true;
  };
  serverVersion: string;
  serverCommit: string;
  signup: {
    allowed: boolean;
    allowedForCurrentIP: boolean;
    requiresEmailVerification: boolean;
  };
  transcoding: {
    enabledResolutions: number[];
  };
  import: {
    videos: {
      http: {
        enabled: boolean;
      };
      torrent: {
        enabled: boolean;
      };
    };
  };
  avatar: {
    file: {
      size: {
        max: number;
      };
    };
    extensions: string[];
  };
  video: {
    file: {
      extensions: string[];
    };
    image: {
      extensions: string[];
      size: {
        max: number;
      };
    };
  };
  videoCaption: {
    file: {
      size: {
        max: number;
      };
      extensions: string[];
    };
  };
  user: {
    videoQuota: number;
    videoQuotaDaily: number;
  };
  trending: {
    videos: {
      intervalDays: number;
    };
  };
}
