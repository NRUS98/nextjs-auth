## Роуты

- **/login** - вход в приложение
- **/signup** - регистрация в приложении
- **/** - домашняя страница. Переход на смену пароля и вывод payload токенов через [server actions c custom invocation](https://nextjs.org/docs/app/api-reference/functions/server-actions#invocation)
- **/photos** - вывод галереи через [Next Image](https://nextjs.org/docs/app/building-your-application/optimizing/images). Также реализован ISR c [Time-based Revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#time-based-revalidation)
- **/posts** - вывод списка постов с [динамическим роутингом и SSG ](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
- **/change-password** - смена пароля пользователя через [form server actions](https://nextjs.org/docs/app/api-reference/functions/server-actions#with-client-components)


<img width="550"  src="https://imageup.ru/img259/4505358/screenshot_1.png" border="0" alt="direct link image hosting">
