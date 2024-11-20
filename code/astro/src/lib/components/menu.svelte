<script lang="ts">
  import { map } from 'rxjs'
  import { getWindow } from '~/lib/services/layout.service'
  const baseUrl = import.meta.env.BASE_URL

  export const menus = [
    {
      title: 'Home',
      path: baseUrl + '',
    },
    {
      title: 'Todos-React',
      path: baseUrl + 'todos-react/',
    },
    {
      title: 'Todos-svelte(ssr)',
      path: baseUrl + 'todos-svelte/',
    },
    // {
    //   title: "SSR",
    //   path: "/ssr/",
    // },
    // {
    //   title: "ENV",
    //   path: "/env/",
    // },
    // {
    //   title: "EXCEPTION",
    //   path: "/exception/",
    // },
  ]

  const location$ = getWindow().pipe(map((w) => w.location))
</script>

<ul class="flex">
  {#each menus as item}
    <li class="mr-2">
      <a
        class:text-red-5={($location$?.pathname ?? '') === item.path}
        class="text-blue-5 underline"
        href={item.path}
      >
        {item.title}
      </a>
    </li>
  {/each}
</ul>
