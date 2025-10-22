import chalk from 'chalk';
import { readFileSync } from 'fs';
import { join } from 'path';

const cwd = process.cwd();
const msg = readFileSync(join(cwd, '.git/COMMIT_EDITMSG'), 'utf-8').trim();

const commitRE =
    /^(((\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55]) )?(revert: )?(feat|fix|docs|UI|refactor|perf|workflow|build|CI|typos|chore|tests|types|wip|release|dep|locale)(\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
    console.error(
        `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red('提交日志不符合规范')}\n\n` +
            chalk.red('  合法的提交日志格式如下(emoji 和 模块可选填)：\n\n') +
            `    ${chalk.green('[<emoji>] [revert: ?]<type>[(scope)?]: <message>')}\n` +
            `    ${chalk.green('💥 feat(模块): 添加了个很棒的功能')}\n` +
            `    ${chalk.green('🐛 fix(模块): 修复了一些 bug')}\n` +
            `    ${chalk.green('📝 docs(模块): 更新了一下文档')}\n` +
            `    ${chalk.green('🌷 UI(模块): 修改了一下样式')}\n` +
            `    ${chalk.green('🏰 chore(模块): 对脚手架做了些更改')}\n` +
            `    ${chalk.green('🌐 locale(模块): 为国际化做了微小的贡献')}\n` +
            chalk.green('其他提交类型: refactor, perf, workflow, build, CI, typos, tests, types, wip, release, dep\n') +
            chalk.red('See https://github.com/vuejs/core/blob/main/.github/commit-convention.md\n'),
    );
    process.exit(1);
}
