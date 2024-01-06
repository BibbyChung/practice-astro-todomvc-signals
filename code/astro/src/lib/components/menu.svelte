<script lang="ts">
  import { map } from "rxjs";
  import { getWindow } from "~/lib/services/layout.service";

  export const menus = [
    {
      title: "Home",
      path: "/"
    },
    {
      title: "Todos-React",
      path: "/todos-react/"
    },
    {
      title: "Todos-svelte",
      path: "/todos-svelte/"
    },
    {
      title: "Todos-vue",
      path: "/todos-vue/"
    }
    // {
    //   title: "ENV",
    //   path: "/env/",
    // },
    // {
    //   title: "EXCEPTION",
    //   path: "/exception/",
    // },
  ];

  const location$ = getWindow().pipe(map((w) => w.location));
</script>

<ul class="flex">
  {#each menus as item}
    <li class="mr-2">
      <a
        class:text-red-5={($location$?.pathname ?? "") === item.path}
        class="text-blue-5 underline"
        href={item.path}>{item.title}</a
      >
    </li>
  {/each}
</ul>
