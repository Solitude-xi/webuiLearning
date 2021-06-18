#include <stdio.h>

struct node
{
    int id;
    char name[15];
    int gra;
};

int main ()
{
    int N;
    while (1)
    {
        scanf("%d", &N);
        if (!N)
        {
            break;
        }
        struct node a[N + 5];
        for (int i = 0; i < N; i++)
        {
            scanf("%d %s %d", &a[i].id, &a[i].name, &a[i].gra);
        }
        int max = a[0].gra;
        int ans = 0;
        for (int i = 1; i < N; i++)
        {
            if (max <= a[i].gra)
            {
                ans = i;
            }
        }
        printf("%s %d\n", a[ans].name, a[ans].id);
    }
    return 0;
}
