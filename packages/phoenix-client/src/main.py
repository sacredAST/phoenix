from phoenix.client import Client

import pandas as pd

client = Client()

def load():
    conversations_all = pd.read_csv("./ex/conversation.csv")
    messages_all = pd.read_csv("./ex/message.csv")
    user_info_all = pd.read_csv("./ex/user_info.csv")
    chunks_all = pd.read_csv("./ex/chunk_metadata.csv")

    return conversations_all, messages_all, user_info_all, chunks_all


def main():
    project_list = client.projects.list()

    conversations_all, messages_all, user_info_all, chunks_all = load()

    # user_count = user_info_all['user_id'].nunique()
    # user_info_all['last_login'] = pd.to_datetime(user_info_all['last_login'])
    # user_info_all['year_month'] = user_info_all['last_login'].dt.to_period('M')
    # user_info_all['date'] = user_info_all['last_login'].dt.date
    # monthly_active_users = user_info_all.groupby('year_month')['user_id'].nunique()
    # daily_active_users = user_info_all.groupby('date')['user_id'].nunique()
    # average_mau = monthly_active_users.mean()
    # average_dau = daily_active_users.mean()
    # conversation_count = conversations_all['conversation_id'].nunique()
    # message_count = messages_all['message_id'].nunique()
    # average_messages_per_conversation = message_count / conversation_count
    # messages_all['timestamp'] = pd.to_datetime(messages_all['timestamp'])
    # messages_all['year_month'] = messages_all['timestamp'].dt.to_period('M')
    # messagea_over_months = messages_all.groupby('year_month')['message_id'].nunique()

    # print(f">>> User Count: {user_count}")
    # print(f">>> Count of conversation: {conversation_count}")
    # print(f">>> Message Count: {message_count}")
    # print(f">>> Average Monthly Active Users: {average_mau}")
    # print(f">>> Average Daily Active Users: {average_dau}")
    # print(f">>> Average Messages per Conversation: {average_messages_per_conversation}")

    print(project_list)

    project_name = project_list[0].get('name', '')

    # client.usages.insert_user_info(project_name=project_name, user_info_dataframe= user_info_all[['user_id', 'name', 'email', 'last_login']])
    
    client.usages.insert_message_info(project_name=project_name, message_info_dataframe=messages_all[['user_id', 'message_id', 'conversation_id', 'timestamp']])
    
    # user_infos = client.usages.get_user_info(project_name=project_name)

    # print(user_infos)

if __name__ == "__main__":
    main()