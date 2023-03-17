start:
	pnpm install
	pnpm dev:prepare
	pnpm dev

release:
	changelogen --release && git push --follow-tags