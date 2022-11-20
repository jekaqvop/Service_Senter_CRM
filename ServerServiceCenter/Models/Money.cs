using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Money
    {
        private long value;
        public Money(double value)
        {
            this.value = (long)Math.Round(100 * value, 2);
        }
        public Money(long high, byte low)
        {
            if (low < 0 || low > 99) throw new ArgumentException();
            if (high >= 0) value = 100 * high + low;
            else value = 100 * high - low;
        }
        // Вспомогательный конструктор
        private Money(long copecks) { this.value = copecks; }

        // Количество рублей
        public long High
        { get { return value / 100; } }
        // Количество копеек
        public byte Low
        { get { return (byte)(value % 100); } }

        // Умножение - функциональная форма
        public Money Multiply(double value)
        { return new Money((long)Math.Round(this.value * value, 2)); }
        // Умножение - операторная форма
        public static Money operator *(double a, Money b)
        { return new Money((long)Math.Round(a * b.value, 2)); }
        public static Money operator *(Money a, double b)
        { return new Money((long)Math.Round(a.value * b, 2)); }
        // Деление на одинаковые части
        // Количество частей должно быть не меньше 2
        public Money[] Share(uint n)
        {
            if (n < 2) throw new ArgumentException();
            Money lowResult = new Money(value / n);
            Money highResult =
              lowResult.value >= 0 ?
                new Money(lowResult.value + 1) :
                new Money(lowResult.value - 1);
            Money[] results = new Money[n];
            long remainder = Math.Abs(value % n);
            for (long i = 0; i < remainder; i++) results[i] = highResult;
            for (long i = remainder; i < n; i++) results[i] = lowResult;
            return results;
        }
        // Деление пропорционально коэффициентам
        // Количество коэффициентов должно быть не меньше 2
        public Money[] Allocate(params uint[] ratios)
        {
            if (ratios.Length < 2) throw new ArgumentException();
            long total = 0;
            for (int i = 0; i < ratios.Length; i++) total += ratios[i];
            long remainder = value;
            Money[] results = new Money[ratios.Length];
            for (int i = 0; i < results.Length; i++)
            {
                results[i] = new Money(value * ratios[i] / total);
                remainder -= results[i].value;
            }
            if (remainder > 0)
                for (int i = 0; i < remainder; i++) results[i].value++;
            else
                for (int i = 0; i > remainder; i--) results[i].value--;
            return results;
        }
        public static bool operator >(Money counter1, Money counter2)
        {
            return counter1.value > counter2.value;
        }
        public static bool operator <(Money counter1, Money counter2)
        {
            return counter1.value < counter2.value;
        }

        public static bool operator !=(Money a, Money b)
        { return a.value != b.value; }

        public static bool operator ==(Money a, Money b)
        { return a.value == b.value; }

        public int CompareTo(Money r)
        {
            if (value < r.value) return -1;
            else if (value == r.value) return 0;
            else return 1;
        }

        public static implicit operator double(Money r)
        { return (double)r.value / 100; }
        public static explicit operator Money(double d)
        { return new Money(d); }

        public override string ToString()
        { return ((double)this).ToString(); }
        // Преобразования в строку аналогично double
        public string ToString(IFormatProvider provider)
        {
            if (provider is IMoneyToStringProvider)
                // здесь - формирование числа прописью
                return ((IMoneyToStringProvider)provider).MoneyToString(this);
            else
                // а здесь - обычный double с учетом стандартного провайдера
                return ((double)this).ToString(provider);
        }
        public string ToString(string format)
        { return ((double)this).ToString(format); }
        public string ToString(string format, IFormatProvider provider)
        { return ((double)this).ToString(format, provider); }



    }
}
