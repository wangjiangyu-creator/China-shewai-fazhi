# 中国涉外法治研究门户

中英文双语静态研究门户，当前第一版聚焦资料库、专题研究入口和双语检索。

## 本地运行

```bash
npm install
npm run dev
```

当前 Codex 环境没有系统 `npm`，可使用本次已经安装好的依赖直接运行：

```bash
ASTRO_TELEMETRY_DISABLED=1 /Users/wangjiangyu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node ./node_modules/.bin/astro dev --host 127.0.0.1
```

## 常用检查

```bash
npm run test
npm run check
npm run build
```

## 内容维护

- 资料数据：`src/data/resources.json`
- 栏目、专题、研究工具：`src/data/taxonomy.json`
- 每条资料必须保留中文标题、英文标题或英文简介、来源、日期、分类、专题、关键词和官方中文链接。
- 有官方英文版时，`englishStatus` 使用 `official` 并填写 `officialEnglishUrl`。
- 没有官方英文版时，`englishStatus` 使用 `summary-only`，英文内容只作为本站简介，不标注为官方译文。

## 首批栏目

- 资料库：领导讲话和政策文件、涉外立法、国际法与条约、案例与实践、学术文献、国际组织与全球治理
- 专题研究：涉外法治理论、经贸与投资、制裁与反制裁、涉外纠纷解决、企业合规、数据跨境与数字法治、海外利益保护、人才培养、国别与区域法治
- 研究工具：法治数据与时间线、术语与索引、典型法律工具箱、研究成果与项目动态
