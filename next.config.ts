import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			use: ['@svgr/webpack'],
		});

		config.resolve.alias = {
			...(config.resolve.alias || {}),
			'@': path.resolve(__dirname, 'src'),
		};

		return config;
	},

	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://52.9.74.40/:path*',
			},
		];
	},
	turbopack: {
		rules: {
			'*.svg': {
				loaders: ['@svgr/webpack'],
				as: '*.js',
			},
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'conectbuild-upload.s3.us-east-1.amazonaws.com',
			},
		],
	},
};

export default nextConfig;
