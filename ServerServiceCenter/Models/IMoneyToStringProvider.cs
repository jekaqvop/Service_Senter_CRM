namespace Models
{
    public interface IMoneyToStringProvider : IFormatProvider
    {
        string MoneyToString(Money money);
        public string ToString(IFormatProvider provider);
    }
}