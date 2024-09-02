namespace Cheesecake.Data
{
    public class CheesecakeRepository
    {
        private readonly string _connection;

        public CheesecakeRepository(string connection)
        {
            _connection = connection;
        }

        public List<OneCheesecake> GetAll()
        {
            CheesecakeDataContext context = new CheesecakeDataContext(_connection);
            return context.Cheesecakes.ToList();
        }

        public void AddCheesecake(OneCheesecake c)
        {
            CheesecakeDataContext context = new CheesecakeDataContext(_connection);
            context.Cheesecakes.Add(c);
            context.SaveChanges();
        }

        public OneCheesecake GetByID(int id)
        {
            CheesecakeDataContext context = new CheesecakeDataContext(_connection);
            return context.Cheesecakes.FirstOrDefault(c => c.Id == id);
        }
    }
}
