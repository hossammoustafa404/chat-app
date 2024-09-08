//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const path = require('path');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/fsd-app/styles')],
    prependData: `
    @import "src/fsd-app/styles/variables";
    @import "src/fsd-app/styles/functions";
    @import "src/fsd-app/styles/mixins";
    `,
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
