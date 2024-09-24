import { Button, ButtonVariant, cn, Icon, IconCatalog } from 'side-ui';

interface RootNavbarProps {
  /**
   * The CSS class to apply to the RootNavBar.
   */
  className?: string;
}

export const RootNavbar = ({ className }: RootNavbarProps) => {
  const classes = {
    container: cn('py-4', className),
  };

  return (
    <>
      <header className={classes.container}>
        <div className="container mx-auto">
          <nav className="flex justify-end">
            <Button
              variant={ButtonVariant.ghost}
              className="dark:transparent group aspect-square rounded-full transition-colors duration-200 ease-in-out dark:hover:bg-white"
            >
              <Icon
                icon={IconCatalog.cog6Tooth}
                className="min-h-6 min-w-6 text-white transition-colors duration-200 ease-in-out group-hover:text-black"
              />
            </Button>
          </nav>
        </div>
      </header>
    </>
  );
};
